"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import tripImage from "@/assets/images/trip.png";

export default function TripCalPage() {
  const [distance, setDistance] = useState<number>(250);
  const [fuelConsumption, setFuelConsumption] = useState<number>(14); // กม./ลิตร
  const [fuelPrice, setFuelPrice] = useState<number>(38); // บาท/ลิตร
  const [hotelCost, setHotelCost] = useState<number>(1500);
  const [foodCost, setFoodCost] = useState<number>(1200);
  const [otherCost, setOtherCost] = useState<number>(500);
  const [travelers, setTravelers] = useState<number>(2);

  // คำนวณค่าน้ำมัน
  const fuelLiters = distance > 0 && fuelConsumption > 0 ? distance / fuelConsumption : 0;
  const totalFuelCost = fuelLiters * fuelPrice;

  // รวมค่าใช้จ่ายทั้งหมด
  const totalTripCost = totalFuelCost + hotelCost + foodCost + otherCost;
  const costPerPerson = travelers > 0 ? totalTripCost / travelers : totalTripCost;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-700 bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 z-10">
        <div className="flex items-center justify-between py-3 px-5 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-100 shadow-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-blue-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>กลับหน้าหลัก</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
              TC
            </div>
            <span className="font-bold text-slate-800 text-sm sm:text-base">ระบบคำนวณค่าใช้จ่ายการเดินทาง</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            คำนวณและประเมินงบประมาณการเดินทาง
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5">
            ปรับเปลี่ยนข้อมูลด้านล่างเพื่อดูงบประมาณรวมและค่าใช้จ่ายเฉลี่ยต่อคนแบบเรียลไทม์
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b border-sky-100 pb-3 flex items-center gap-2">
              <span>🚗</span> ข้อมูลการเดินทางและยานพาหนะ
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ระยะทางรวมไป-กลับ (กิโลเมตร)
                </label>
                <input
                  type="number"
                  min="0"
                  value={distance}
                  onChange={(e) => setDistance(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  อัตราสิ้นเปลือง (กิโลเมตร / ลิตร)
                </label>
                <input
                  type="number"
                  min="1"
                  value={fuelConsumption}
                  onChange={(e) => setFuelConsumption(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ราคาน้ำมันเฉลี่ย (บาท / ลิตร)
                </label>
                <input
                  type="number"
                  min="0"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  จำนวนผู้ร่วมเดินทาง (คน)
                </label>
                <input
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-800 border-b border-sky-100 pb-3 pt-2 flex items-center gap-2">
              <span>🏨</span> ค่าใช้จ่ายอื่นๆ ในทริป
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ค่าที่พักรวม (บาท)
                </label>
                <input
                  type="number"
                  min="0"
                  value={hotelCost}
                  onChange={(e) => setHotelCost(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ค่าอาหาร/เครื่องดื่ม (บาท)
                </label>
                <input
                  type="number"
                  min="0"
                  value={foodCost}
                  onChange={(e) => setFoodCost(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ค่ากิจกรรม/อื่นๆ (บาท)
                </label>
                <input
                  type="number"
                  min="0"
                  value={otherCost}
                  onChange={(e) => setOtherCost(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-200 bg-sky-50/40 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
                <span className="text-sm font-medium text-sky-100">สรุปงบประมาณรวม</span>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{travelers} ผู้เดินทาง</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-sky-100">
                  <span>ค่าน้ำมัน ({fuelLiters.toFixed(1)} ลิตร)</span>
                  <span className="font-semibold text-white">{totalFuelCost.toLocaleString("th-TH", { maximumFractionDigits: 0 })} บาท</span>
                </div>
                <div className="flex justify-between text-sm text-sky-100">
                  <span>ค่าที่พัก</span>
                  <span className="font-semibold text-white">{hotelCost.toLocaleString("th-TH")} บาท</span>
                </div>
                <div className="flex justify-between text-sm text-sky-100">
                  <span>ค่าอาหารและเครื่องดื่ม</span>
                  <span className="font-semibold text-white">{foodCost.toLocaleString("th-TH")} บาท</span>
                </div>
                <div className="flex justify-between text-sm text-sky-100">
                  <span>ค่าใช้จ่ายเบ็ดเตล็ด</span>
                  <span className="font-semibold text-white">{otherCost.toLocaleString("th-TH")} บาท</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-light text-sky-100">ยอดรวมทั้งสิ้น:</span>
                  <span className="text-3xl font-extrabold">{totalTripCost.toLocaleString("th-TH", { maximumFractionDigits: 0 })} <span className="text-lg font-normal">บาท</span></span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-sm flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium">เฉลี่ยจ่ายคนละ:</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300">
                    {costPerPerson.toLocaleString("th-TH", { maximumFractionDigits: 0 })} <span className="text-xs sm:text-sm text-white font-normal">บาท/คน</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Trip Mascot Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/80 border border-sky-100 shadow-xs">
              <div className="w-16 h-16 shrink-0 relative">
                <Image src={tripImage} alt="Trip Icon" className="object-contain" priority />
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                <p className="font-semibold text-slate-800">พร้อมออกเดินทางหรือยัง?</p>
                <p className="text-slate-500 mt-0.5">วางแผนงบประมาณล่วงหน้า ช่วยให้ท่องเที่ยวได้อย่างสบายใจและคุมค่าใช้จ่ายได้อยู่หมัด</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-400 z-10">
        ระบบคำนวณค่าใช้จ่ายการเดินทาง (TripCal) • หน้าเพจ TripCal
      </footer>
    </div>
  );
}
