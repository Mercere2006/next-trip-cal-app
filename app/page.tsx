import Image from "next/image";
import Link from "next/link";
import tripImage from "@/assets/images/trip.png";

// URL รูปภาพพื้นหลังตามที่ระบุจาก Pinterest (https://www.pinterest.com/pin/739153357566678550/)
// โดยเก็บไฟล์สำรองความละเอียดสูงไว้ที่ /images/travel-bg.jpg เพื่อการโหลดที่เสถียรและรวดเร็ว
const BACKGROUND_IMAGE_URL = "/images/travel-bg.jpg";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-700">
      {/* 1. Background Image layer (Pinterest Pin: https://www.pinterest.com/pin/739153357566678550/) */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <Image
          src={BACKGROUND_IMAGE_URL}
          alt="Travel landmarks background"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center filter brightness-[1.02] contrast-[0.98]"
        />
        {/* Soft light-blue leaning towards white overlay & subtle blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/90 via-sky-50/80 to-white/95 backdrop-blur-[1.5px]" />
        {/* Decorative soft ambient light orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      {/* 2. Top Header (Clean branding without white box and without top-right button) */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-800 to-blue-950 bg-clip-text text-transparent">
              Trip Calculator
            </span>
          </div>
        </div>
      </header>

      {/* 3. Hero Main Section (Open layout without enclosing white box) */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-16 z-10">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Text Information & Button */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              {/* Feature Pill Badge */}


              {/* Primary Title Required by User */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 leading-[1.15]">
                  เว็บคำนวณค่าใช้จ่าย
                  <span className="block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    การเดินทาง
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal max-w-xl leading-relaxed">
                  จัดการงบประมาณทริปในฝันของคุณได้อย่างง่ายดาย คำนวณค่าน้ำมัน
                  ค่าเดินทาง ค่าที่พัก และค่าอาหารได้อย่างแม่นยำ ครบ จบ
                  ในที่เดียว
                </p>
              </div>

              {/* Feature Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pt-1">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-200/60 backdrop-blur-sm border border-sky-300/50 text-slate-700 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-500/15 text-sky-700 shrink-0">
                    ⛽
                  </div>
                  <span className="font-medium">คำนวณค่าน้ำมันตามระยะทาง</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-200/60 backdrop-blur-sm border border-sky-300/50 text-slate-700 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-500/15 text-sky-700 shrink-0">
                    🏨
                  </div>
                  <span className="font-medium">รวมค่าที่พักและค่าอาหาร</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-200/60 backdrop-blur-sm border border-sky-300/50 text-slate-700 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-500/15 text-sky-700 shrink-0">
                    👥
                  </div>
                  <span className="font-medium">หารเฉลี่ยตามจำนวนคน</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-200/60 backdrop-blur-sm border border-sky-300/50 text-slate-700 text-sm">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sky-500/15 text-sky-700 shrink-0">
                    📊
                  </div>
                  <span className="font-medium">สรุปค่าใช้จ่ายชัดเจน</span>
                </div>
              </div>

              {/* Action Link Button to app/tripcal/page.tsx */}
              <div className="pt-4 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/tripcal"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-40 py-4 text-base sm:text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300"
                >
                  <span>เริ่มต้นคำนวณค่าใช้จ่าย</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column: Trip Image Display (assets/images/trip.png) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] flex items-center justify-center">
                {/* Soft glowing ambient light behind illustration */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300/40 via-blue-200/30 to-indigo-200/30 blur-3xl transform scale-110 pointer-events-none" />

                <Image
                  src={tripImage}
                  alt="ภาพการเดินทางและอุปกรณ์ท่องเที่ยว"
                  priority
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
