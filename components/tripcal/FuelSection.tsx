"use client";

import { FuelConfig, Member } from "@/types/tripcal";

interface FuelSectionProps {
  fuelConfig: FuelConfig;
  onChangeFuel: (newConfig: FuelConfig) => void;
  members: Member[];
}

export default function FuelSection({
  fuelConfig,
  onChangeFuel,
  members,
}: FuelSectionProps) {
  const { distance, consumption, pricePerLiter, paidById } = fuelConfig;

  // คำนวณตามสูตรที่กำหนดในโจทย์:
  // ค่าน้ำมันรวม = (ระยะทางรวม / อัตราสิ้นเปลือง) × ราคาน้ำมันต่อลิตร
  const fuelLiters =
    distance > 0 && consumption > 0 ? distance / consumption : 0;
  const totalFuelCost = fuelLiters * pricePerLiter;

  const handleUpdate = (field: keyof FuelConfig, value: number | string) => {
    onChangeFuel({
      ...fuelConfig,
      [field]: value,
    });
  };

  const payer = members.find((m) => m.id === paidById);

  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-900/5 p-5 sm:p-7 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sky-100/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 text-lg font-bold">
            ⛽
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              คำนวณค่าน้ำมันจากระยะทาง
            </h2>
            <p className="text-xs text-slate-500">
              สูตร: (ระยะทางรวม ÷ อัตราสิ้นเปลือง) × ราคาน้ำมันต่อลิตร
            </p>
          </div>
        </div>

        <span className="text-xs text-sky-700 bg-sky-50 border border-sky-200/60 px-3 py-1 rounded-full font-medium hidden sm:inline-block">
          ระบบคำนวณอัตโนมัติ
        </span>
      </div>

      {/* Main Row: Inputs on Left (stacked in rows descending), Result Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 4 Inputs arranged in rows descending (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
          {/* 1. ระยะทางรวมของทริป */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-sky-600">📍</span>
                <span>ระยะทางรวมของทริป</span>
              </span>
              <span className="text-slate-400 font-normal text-[11px]">กิโลเมตร</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={distance === 0 ? "" : distance}
                onChange={(e) => {
                  const val = e.target.value === "" ? 0 : Number(e.target.value);
                  handleUpdate("distance", isNaN(val) ? 0 : Math.max(0, val));
                }}
                placeholder="เช่น 350"
                className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-sm transition-all pr-12"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                กม.
              </span>
            </div>
          </div>

          {/* 2. ราคาน้ำมันต่อลิตร */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-sky-600">⛽</span>
                <span>ราคาน้ำมันต่อลิตร</span>
              </span>
              <span className="text-slate-400 font-normal text-[11px]">บาท / ลิตร</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={pricePerLiter === 0 ? "" : pricePerLiter}
                onChange={(e) => {
                  const val = e.target.value === "" ? 0 : Number(e.target.value);
                  handleUpdate("pricePerLiter", isNaN(val) ? 0 : Math.max(0, val));
                }}
                placeholder="เช่น 38.50"
                className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-sm transition-all pr-16"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                บาท/ลิตร
              </span>
            </div>
          </div>

          {/* 3. อัตราสิ้นเปลืองของรถ */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-sky-600">🚗</span>
                <span>อัตราสิ้นเปลืองของรถ</span>
              </span>
              <span className="text-slate-400 font-normal text-[11px]">กม. / ลิตร</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={consumption === 0 ? "" : consumption}
                onChange={(e) => {
                  const val = e.target.value === "" ? 0 : Number(e.target.value);
                  handleUpdate("consumption", isNaN(val) ? 0 : Math.max(0, val));
                }}
                placeholder="เช่น 14.5"
                className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-sm transition-all pr-16"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                กม./ลิตร
              </span>
            </div>
          </div>

          {/* 4. ผู้จ่ายค่าน้ำมัน */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-sky-600">👤</span>
                <span>ผู้จ่ายค่าน้ำมัน</span>
              </span>
              <span className="text-slate-400 font-normal text-[11px]">ระบุคนออกเงิน</span>
            </label>
            <select
              value={paidById}
              onChange={(e) => handleUpdate("paidById", e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-semibold text-sm transition-all cursor-pointer"
            >
              {members.length === 0 ? (
                <option value="">-- ยังไม่มีสมาชิก (เพิ่มสมาชิกด้านบนก่อน) --</option>
              ) : (
                <>
                  <option value="">-- เลือกผู้จ่ายค่าน้ำมัน --</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>

        {/* Right Column: Result Card (lg:col-span-5) */}
        <div className="lg:col-span-5 flex">
          <div className="w-full rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-5 sm:p-6 text-white shadow-xl shadow-sky-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⛽</span>
                <span className="font-bold text-sm tracking-wide text-sky-100 uppercase">
                  ผลลัพธ์ค่าน้ำมัน
                </span>
              </div>
              <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full text-white">
                คำนวณอัตโนมัติ
              </span>
            </div>

            <div className="space-y-3.5 my-auto py-3">
              <div>
                <span className="text-xs text-sky-100 font-normal block">
                  รวมค่าน้ำมันทั้งทริป:
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ฿{totalFuelCost.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-normal text-sky-100">บาท</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/15 text-xs text-sky-100">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-sky-200 block">ปริมาณน้ำมันที่ใช้:</span>
                  <strong className="text-sm font-bold text-white block mt-0.5">
                    {fuelLiters > 0 ? `${fuelLiters.toFixed(1)} ลิตร` : "0.0 ลิตร"}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs">
                  <span className="text-[11px] text-sky-200 block">ผู้รับผิดชอบจ่าย:</span>
                  <strong className="text-sm font-bold text-amber-300 block mt-0.5 truncate">
                    {payer?.name || (members.length === 0 ? "ยังไม่มีสมาชิก" : "ยังไม่ระบุ")}
                  </strong>
                </div>
              </div>

              <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-[11px] text-sky-100 flex items-center gap-1.5">
                <span>ℹ️</span>
                <span>สูตร: ({distance || 0} ÷ {consumption || 0}) × {pricePerLiter || 0}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 text-[11px] text-sky-100 text-center sm:text-left">
              ยอดนี้จะถูกนำไปรวมกับค่าใช้จ่ายอื่น ๆ และหารเฉลี่ยให้ทุกคนในทริป
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
