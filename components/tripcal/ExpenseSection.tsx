"use client";

import { useState, useMemo } from "react";
import { ExpenseItem, Member } from "@/types/tripcal";

interface ExpenseSectionProps {
  expenses: ExpenseItem[];
  members: Member[];
  onAddExpense: (expense: Omit<ExpenseItem, "id" | "createdAt">) => void;
  onRemoveExpense: (id: string) => void;
}

const QUICK_TAGS = [
  { label: "ค่าทางด่วน", icon: "🚗", category: "transport" },
  { label: "ค่าที่พัก", icon: "🏨", category: "hotel" },
  { label: "ค่าอาหาร", icon: "🍜", category: "food" },
  { label: "ค่าคาเฟ่/เครื่องดื่ม", icon: "☕", category: "cafe" },
  { label: "ค่าตั๋ว/กิจกรรม", icon: "🎟️", category: "activity" },
  { label: "ของฝาก/ซื้อของ", icon: "🛍️", category: "shopping" },
];

export default function ExpenseSection({
  expenses,
  members,
  onAddExpense,
  onRemoveExpense,
}: ExpenseSectionProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [selectedPayerId, setSelectedPayerId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [errorMsg, setErrorMsg] = useState("");

  // คำนวณผู้จ่ายเงินที่ถูกต้องตามรายชื่อสมาชิกปัจจุบัน
  const effectivePaidById = useMemo(() => {
    if (selectedPayerId && members.some((m) => m.id === selectedPayerId)) {
      return selectedPayerId;
    }
    return members[0]?.id || "";
  }, [selectedPayerId, members]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const numAmount = parseFloat(amount);

    if (members.length === 0) {
      setErrorMsg("กรุณาเพิ่มสมาชิกในทริปด้านบนก่อนบันทึกรายการ");
      return;
    }
    if (!trimmedTitle) {
      setErrorMsg("กรุณาระบุชื่อรายการค่าใช้จ่าย");
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg("กรุณาระบุจำนวนเงินที่ถูกต้อง (มากกว่า 0)");
      return;
    }
    if (!effectivePaidById) {
      setErrorMsg("กรุณาเลือกผู้จ่ายเงิน");
      return;
    }

    onAddExpense({
      title: trimmedTitle,
      amount: numAmount,
      paidById: effectivePaidById,
      category: selectedCategory,
    });

    setTitle("");
    setAmount("");
    setErrorMsg("");
  };

  const handleQuickTagClick = (tagLabel: string, category: string) => {
    setTitle(tagLabel);
    setSelectedCategory(category);
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-900/5 p-5 sm:p-7 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 text-lg font-bold">
            🧾
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              รายการค่าใช้จ่ายอื่น ๆ ในทริป
            </h2>
            <p className="text-xs text-slate-500">
              เช่น ค่าที่พัก, ค่าอาหาร, ค่าทางด่วน โดยระบุจำนวนเงินและผู้จ่าย
            </p>
          </div>
        </div>

        <span className="text-xs text-sky-700 bg-sky-50 border border-sky-200/60 px-3 py-1 rounded-full font-medium hidden sm:inline-block">
          บันทึกค่าใช้จ่าย
        </span>
      </div>

      {/* Quick Tag Recommendations */}
      <div className="mb-4">
        <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
          แท็กด่วนสำหรับเลือกรายการยอดนิยม:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleQuickTagClick(tag.label, tag.category)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200/60 text-slate-700 text-xs font-medium transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleAdd} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Title */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ชื่อรายการค่าใช้จ่าย
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="เช่น ค่าอาหารมื้อเย็น, ค่าโรงแรมคืนที่ 1..."
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
            />
          </div>

          {/* Amount */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              จำนวนเงิน (บาท)
            </label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="เช่น 1200"
              className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-sm transition-all"
            />
          </div>

          {/* Paid By */}
          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ผู้จ่ายเงิน
            </label>
            <select
              value={effectivePaidById}
              onChange={(e) => setSelectedPayerId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-sm transition-all cursor-pointer"
            >
              {members.length === 0 ? (
                <option value="">-- ยังไม่มีสมาชิก (เพิ่มสมาชิกด้านบนก่อน) --</option>
              ) : (
                <>
                  <option value="">-- เลือกผู้จ่ายเงิน --</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-500 mt-2 flex items-center gap-1">
            <span>⚠️</span> {errorMsg}
          </p>
        )}

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all cursor-pointer active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>เพิ่มรายการค่าใช้จ่าย</span>
          </button>
        </div>
      </form>

      {/* Expenses List */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          รายการค่าใช้จ่ายที่บันทึกแล้ว ({expenses.length} รายการ)
        </h3>

        {expenses.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-sky-50/40 border border-dashed border-sky-200 text-slate-400">
            <span className="text-3xl block mb-2">🏝️</span>
            <p className="text-sm font-medium text-slate-600">
              ยังไม่มีรายการค่าใช้จ่ายอื่น ๆ
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              พิมพ์ชื่อรายการและจำนวนเงินด้านบน แล้วกดเพิ่มรายการได้เลย
            </p>
          </div>
        ) : (
          <div className="divide-y divide-sky-100/80 border border-sky-100/90 rounded-2xl overflow-hidden bg-white/60">
            {expenses.map((expense) => {
              const payer = members.find((m) => m.id === expense.paidById);
              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3.5 hover:bg-sky-50/50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-sm shrink-0">
                      💳
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">
                        {expense.title}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <span>จ่ายโดย:</span>
                        <span className="font-semibold text-sky-800">
                          {payer?.name || "ไม่ทราบชื่อ"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm sm:text-base font-extrabold text-slate-800">
                      ฿{expense.amount.toLocaleString("th-TH")}
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemoveExpense(expense.id)}
                      title="ลบรายการ"
                      className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-xl transition-all cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* รวมค่าใช้จ่ายทั้งหมดไว้ด้านล่างตามที่ผู้ใช้ต้องการ */}
      <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-100/70 via-blue-50/60 to-white/90 border border-sky-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            🧾
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block">
              รวมค่าใช้จ่ายอื่น ๆ ทั้งหมด
            </span>
            <span className="text-[11px] text-slate-500">
              บันทึกแล้วทั้งหมด {expenses.length} รายการ
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-medium">ยอดรวม:</span>
          <span className="text-2xl sm:text-3xl font-black text-sky-800 tracking-tight">
            ฿{totalExpenses.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-semibold text-slate-500">บาท</span>
        </div>
      </div>
    </section>
  );
}
