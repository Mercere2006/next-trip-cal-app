"use client";

interface SummaryCardsProps {
  totalFuelCost: number;
  fuelLiters: number;
  totalOtherExpenses: number;
  otherExpensesCount: number;
  grandTotal: number;
  fairShare: number;
  memberCount: number;
}

export default function SummaryCards({
  totalFuelCost,
  fuelLiters,
  totalOtherExpenses,
  otherExpensesCount,
  grandTotal,
  fairShare,
  memberCount,
}: SummaryCardsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. ค่าน้ำมันรวม (แยกออกมาต่างหากตามโจทย์) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-white/90 border border-sky-200/80 p-5 shadow-lg shadow-sky-900/5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-lg shadow-sm">
            ⛽
          </div>
          <span className="text-[11px] font-semibold text-sky-700 bg-sky-100/90 px-2.5 py-0.5 rounded-full border border-sky-200/60">
            แยกต่างหาก
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500 mb-1">
          ค่าน้ำมันรวม
        </p>
        <p className="text-2xl sm:text-3xl font-black text-sky-900 tracking-tight">
          ฿{totalFuelCost.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          ใช้น้ำมัน {fuelLiters.toFixed(1)} ลิตร
        </p>
      </div>

      {/* 2. ค่าใช้จ่ายอื่น ๆ รวม */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-white/90 border border-blue-200/80 p-5 shadow-lg shadow-sky-900/5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-lg shadow-sm">
            🧾
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/90 px-2.5 py-0.5 rounded-full border border-blue-200/60">
            {otherExpensesCount} รายการ
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500 mb-1">
          ค่าใช้จ่ายอื่น ๆ รวม
        </p>
        <p className="text-2xl sm:text-3xl font-black text-blue-900 tracking-tight">
          ฿{totalOtherExpenses.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          ค่าที่พัก, ค่าอาหาร, ค่าทางด่วน ฯลฯ
        </p>
      </div>

      {/* 3. รวมค่าใช้จ่ายทั้งทริป */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-500/15 via-blue-500/10 to-white/95 border border-indigo-200/90 p-5 shadow-xl shadow-indigo-900/5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center text-lg shadow-md shadow-indigo-500/20">
            💰
          </div>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
            ยอดรวมทั้งทริป
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500 mb-1">
          ค่าใช้จ่ายรวมทั้งทริป
        </p>
        <p className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          ฿{grandTotal.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          ค่าน้ำมัน + ค่าใช้จ่ายอื่น ๆ ทุกรายการ
        </p>
      </div>

      {/* 4. ค่าเฉลี่ยที่แต่ละคนควรจ่าย */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-white/95 border border-emerald-200/90 p-5 shadow-xl shadow-emerald-900/5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg shadow-md shadow-emerald-500/20">
            👥
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            {memberCount > 0 ? `หาร ${memberCount} คน` : "ยังไม่มีสมาชิก"}
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-500 mb-1">
          ค่าเฉลี่ยที่แต่ละคนควรจ่าย
        </p>
        <p className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-tight">
          ฿{fairShare.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          ยอดเงินต่อคน (เท่ากันทุกคน)
        </p>
      </div>
    </section>
  );
}
