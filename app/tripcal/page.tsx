"use client";

import { useState, useMemo } from "react";
import BackgroundLayer from "@/components/tripcal/BackgroundLayer";
import TripCalHeader from "@/components/tripcal/TripCalHeader";
import SummaryCards from "@/components/tripcal/SummaryCards";
import MemberSection, { AVATAR_COLORS } from "@/components/tripcal/MemberSection";
import FuelSection from "@/components/tripcal/FuelSection";
import ExpenseSection from "@/components/tripcal/ExpenseSection";
import SettlementSection from "@/components/tripcal/SettlementSection";
import {
  Member,
  ExpenseItem,
  FuelConfig,
  MemberSettlement,
  TransferSuggestion,
} from "@/types/tripcal";

const INITIAL_MEMBERS: Member[] = [];

const INITIAL_FUEL: FuelConfig = {
  distance: 0,
  consumption: 0,
  pricePerLiter: 0,
  paidById: "",
};

const INITIAL_EXPENSES: ExpenseItem[] = [];

export default function TripCalPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [fuelConfig, setFuelConfig] = useState<FuelConfig>(INITIAL_FUEL);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);

  // 1. คำนวณค่าน้ำมันตามสูตร: (ระยะทางรวม / อัตราสิ้นเปลือง) × ราคาน้ำมันต่อลิตร
  const fuelLiters = useMemo(() => {
    if (fuelConfig.distance <= 0 || fuelConfig.consumption <= 0) return 0;
    return fuelConfig.distance / fuelConfig.consumption;
  }, [fuelConfig.distance, fuelConfig.consumption]);

  const totalFuelCost = useMemo(() => {
    return fuelLiters * fuelConfig.pricePerLiter;
  }, [fuelLiters, fuelConfig.pricePerLiter]);

  // 2. คำนวณค่าใช้จ่ายอื่น ๆ รวม
  const totalOtherExpenses = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  // 3. ค่าใช้จ่ายรวมทั้งทริป = ค่าน้ำมันรวม + ผลรวมค่าใช้จ่ายอื่น ๆ ทุกรายการ
  const grandTotal = useMemo(() => {
    return totalFuelCost + totalOtherExpenses;
  }, [totalFuelCost, totalOtherExpenses]);

  // 4. ค่าเฉลี่ยที่แต่ละคนควรจ่าย = ค่าใช้จ่ายรวมทั้งทริป / จำนวนสมาชิก
  const fairShare = useMemo(() => {
    if (members.length === 0) return 0;
    return grandTotal / members.length;
  }, [grandTotal, members.length]);

  // สรุปยอดจ่ายจริงของแต่ละคน (ค่าน้ำมัน + รายการอื่น ๆ)
  const memberExpenseTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    members.forEach((m) => {
      totals[m.id] = 0;
    });

    // บวกค่าน้ำมันให้คนจ่าย
    if (fuelConfig.paidById && totals[fuelConfig.paidById] !== undefined) {
      totals[fuelConfig.paidById] += totalFuelCost;
    }

    // บวกค่าใช้จ่ายอื่น ๆ
    expenses.forEach((e) => {
      if (totals[e.paidById] !== undefined) {
        totals[e.paidById] += e.amount;
      }
    });

    return totals;
  }, [members, fuelConfig.paidById, totalFuelCost, expenses]);

  // 5. สรุปว่าใครจ่ายเกินหรือจ่ายขาด
  const settlements = useMemo<MemberSettlement[]>(() => {
    return members.map((m) => {
      const fuelPaid = m.id === fuelConfig.paidById ? totalFuelCost : 0;
      const otherPaid = expenses
        .filter((e) => e.paidById === m.id)
        .reduce((sum, e) => sum + e.amount, 0);
      const totalPaid = fuelPaid + otherPaid;
      const balance = totalPaid - fairShare;

      return {
        memberId: m.id,
        memberName: m.name,
        avatarColor: m.avatarColor,
        fuelPaid,
        otherPaid,
        totalPaid,
        fairShare,
        balance,
      };
    });
  }, [members, fuelConfig.paidById, totalFuelCost, expenses, fairShare]);

  // 6. คำนวณเส้นทางการโอนเงินเคลียร์ยอด (Debt Settlement Algorithm)
  const transfers = useMemo<TransferSuggestion[]>(() => {
    const debtors = settlements
      .filter((s) => s.balance < -0.01)
      .map((s) => ({
        id: s.memberId,
        name: s.memberName,
        amount: Math.abs(s.balance),
      }));

    const creditors = settlements
      .filter((s) => s.balance > 0.01)
      .map((s) => ({
        id: s.memberId,
        name: s.memberName,
        amount: s.balance,
      }));

    const result: TransferSuggestion[] = [];
    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(debtor.amount, creditor.amount);

      if (amount > 0.01) {
        result.push({
          fromId: debtor.id,
          fromName: debtor.name,
          toId: creditor.id,
          toName: creditor.name,
          amount: Math.round(amount * 100) / 100,
        });
      }

      debtor.amount -= amount;
      creditor.amount -= amount;

      if (debtor.amount < 0.01) i++;
      if (creditor.amount < 0.01) j++;
    }

    return result;
  }, [settlements]);

  // Handlers
  const handleAddMember = (name: string) => {
    const newId = "m_" + Date.now();
    const colorIndex = members.length % AVATAR_COLORS.length;
    const newMember: Member = {
      id: newId,
      name,
      avatarColor: AVATAR_COLORS[colorIndex],
    };
    setMembers((prev) => [...prev, newMember]);

    // หากยังไม่ได้เลือกผู้จ่ายค่าน้ำมัน ให้ตั้งคนแรกที่เพิ่มเป็นคนจ่ายเริ่มต้น
    setFuelConfig((prev) => {
      if (!prev.paidById) {
        return { ...prev, paidById: newId };
      }
      return prev;
    });
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));

    // หากผู้จ่ายค่าน้ำมันถูกลบ ให้เปลี่ยนเป็นคนแรกที่เหลืออยู่ หรือค่าว่าง
    setFuelConfig((prev) => {
      if (prev.paidById === id) {
        const remaining = members.filter((m) => m.id !== id);
        return { ...prev, paidById: remaining[0]?.id || "" };
      }
      return prev;
    });

    // หากมีค่าใช้จ่ายของคนที่ถูกลบ ให้เปลี่ยนเป็นคนแรกที่เหลืออยู่ หรือค่าว่าง
    setExpenses((prev) =>
      prev.map((e) => {
        if (e.paidById === id) {
          const remaining = members.filter((m) => m.id !== id);
          return { ...e, paidById: remaining[0]?.id || "" };
        }
        return e;
      })
    );
  };

  const handleAddExpense = (
    newExpense: Omit<ExpenseItem, "id" | "createdAt">
  ) => {
    const item: ExpenseItem = {
      ...newExpense,
      id: "e_" + Date.now(),
      createdAt: Date.now(),
    };
    setExpenses((prev) => [item, ...prev]);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleResetTrip = () => {
    if (window.confirm("คุณต้องการล้างข้อมูลทริปทั้งหมดและเริ่มใหม่หรือไม่?")) {
      setMembers([]);
      setFuelConfig({
        distance: 0,
        consumption: 0,
        pricePerLiter: 0,
        paidById: "",
      });
      setExpenses([]);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-700">
      {/* 1. Background layer with soft light-blue / white theme */}
      <BackgroundLayer />

      {/* 2. Top Header with Back to Home Link & Branding */}
      <TripCalHeader onResetTrip={handleResetTrip} />

      {/* 3. Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 z-10 space-y-6 sm:space-y-8">
        {/* Page Title & Intro */}
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
            คำนวณค่าทริป & แชร์ค่าใช้จ่าย (Money Shared)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            กรอกข้อมูลระยะทาง อัตราสิ้นเปลือง และค่าใช้จ่ายอื่น ๆ
            ระบบจะหารเฉลี่ยและสรุปยอดจ่ายเกิน/จ่ายขาดให้อัตโนมัติ
          </p>
        </div>

        {/* 4. Summary Cards (Outputs specified in prompt) */}
        <SummaryCards
          totalFuelCost={totalFuelCost}
          fuelLiters={fuelLiters}
          totalOtherExpenses={totalOtherExpenses}
          otherExpensesCount={expenses.length}
          grandTotal={grandTotal}
          fairShare={fairShare}
          memberCount={members.length}
        />

        {/* 5. สมาชิกในทริป (รายชื่อสมาชิกเอาไว้ข้างบนเหมือนเดิม) */}
        <MemberSection
          members={members}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          memberExpenseTotals={memberExpenseTotals}
        />

        {/* 6. ค่าน้ำมันจากระยะทาง (Row Layout: กรอกข้อมูล 4 แถวเรียงลงมาทางซ้าย ผลลัพธ์สมดุลทางขวา) */}
        <FuelSection
          fuelConfig={fuelConfig}
          onChangeFuel={setFuelConfig}
          members={members}
        />

        {/* 7. ค่าใช้จ่ายอื่น ๆ และสรุปยอดเคลียร์เงิน */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: รายการค่าใช้จ่ายอื่น ๆ (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <ExpenseSection
              expenses={expenses}
              members={members}
              onAddExpense={handleAddExpense}
              onRemoveExpense={handleRemoveExpense}
            />
          </div>

          {/* Right Column: สรุปว่าใครจ่ายเกินหรือจ่ายขาด (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 lg:sticky lg:top-6">
            <SettlementSection
              settlements={settlements}
              transfers={transfers}
              grandTotal={grandTotal}
              fairShare={fairShare}
            />
          </div>
        </div>
      </main>

      {/* 6. Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-400 z-10">
        <p>© {new Date().getFullYear()} เว็บคำนวณค่าใช้จ่ายการเดินทาง (Trip Calculator - Money Shared)</p>
      </footer>
    </div>
  );
}
