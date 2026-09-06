import Link from "next/link";

interface TripCalHeaderProps {
  onResetTrip?: () => void;
}

export default function TripCalHeader({ onResetTrip }: TripCalHeaderProps) {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 z-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3.5 px-5 rounded-2xl bg-white/75 backdrop-blur-md border border-sky-100/90 shadow-sm shadow-sky-900/5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center justify-center w-10 h-10 rounded-xl bg-sky-100/80 hover:bg-sky-200/80 text-sky-700 transition-all shadow-xs"
            title="กลับสู่หน้าหลัก"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>

          <div className="flex items-center gap-2.5">
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
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold bg-gradient-to-r from-sky-800 to-blue-950 bg-clip-text text-transparent">
                  TripCal
                </span>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-100/90 border border-sky-200/60 px-2 py-0.5 rounded-full">
                  Money Shared
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                ระบบคำนวณค่าใช้จ่ายท่องเที่ยว หารเฉลี่ย & สรุปจ่ายเกิน/จ่ายขาด
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onResetTrip && (
            <button
              onClick={onResetTrip}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>รีเซ็ตค่าทริป</span>
            </button>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-700 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-xl hover:bg-sky-100/60"
          >
            <span>หน้าแรก</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
