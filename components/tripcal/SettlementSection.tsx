"use client";

import { useState } from "react";
import { MemberSettlement, TransferSuggestion } from "@/types/tripcal";

interface SettlementSectionProps {
  settlements: MemberSettlement[];
  transfers: TransferSuggestion[];
  grandTotal: number;
  fairShare: number;
}

export default function SettlementSection({
  settlements,
  transfers,
  grandTotal,
  fairShare,
}: SettlementSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    if (settlements.length === 0) return;

    let text = "✈️ สรุปค่าใช้จ่ายทริป (TripCal - Money Shared)\n";
    text += `💰 ยอดรวมทั้งทริป: ฿${grandTotal.toLocaleString("th-TH", { maximumFractionDigits: 2 })}\n`;
    text += `👥 ค่าเฉลี่ยต่อคน: ฿${fairShare.toLocaleString("th-TH", { maximumFractionDigits: 2 })}\n\n`;

    text += "📋 สรุปรายบุคคล (จ่ายเกิน / จ่ายขาด):\n";
    settlements.forEach((s) => {
      const balanceStr =
        s.balance > 0
          ? `จ่ายเกิน +฿${s.balance.toLocaleString("th-TH", { maximumFractionDigits: 2 })} (ได้รับคืน)`
          : s.balance < 0
          ? `จ่ายขาด -฿${Math.abs(s.balance).toLocaleString("th-TH", { maximumFractionDigits: 2 })} (ต้องจ่ายเพิ่ม)`
          : "จ่ายพอดี ฿0";
      text += `- ${s.memberName}: ออกไป ฿${s.totalPaid.toLocaleString("th-TH")} -> ${balanceStr}\n`;
    });

    if (transfers.length > 0) {
      text += "\n💸 สรุปการโอนเงินเคลียร์ยอด:\n";
      transfers.forEach((t) => {
        text += `- ${t.fromName} โอนให้ ${t.toName} จำนวน ฿${t.amount.toLocaleString("th-TH", { maximumFractionDigits: 2 })}\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-900/5 p-5 sm:p-7 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 text-lg font-bold">
            ⚖️
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              สรุปยอดว่าใครจ่ายเกินหรือจ่ายขาด
            </h2>
            <p className="text-xs text-slate-500">
              คำนวณเปรียบเทียบจากยอดที่ออกจริงกับค่าเฉลี่ยที่ควรจ่าย
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          disabled={settlements.length === 0}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold transition-all self-start sm:self-auto ${
            settlements.length === 0
              ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
              : "bg-sky-100 hover:bg-sky-200/80 border-sky-200/80 text-sky-800 cursor-pointer active:scale-95"
          }`}
        >
          {copied ? (
            <>
              <span>✅</span>
              <span>คัดลอกข้อความแล้ว!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>คัดลอกสรุปส่งไลน์กลุ่ม</span>
            </>
          )}
        </button>
      </div>

      {/* Member Balance Table / Cards */}
      {settlements.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-sky-50/40 border border-dashed border-sky-200 text-slate-400 mb-6">
          <span className="text-3xl block mb-2">👥</span>
          <p className="text-sm font-semibold text-slate-700">
            ยังไม่มีข้อมูลสมาชิกเพื่อคำนวณยอด
          </p>
          <p className="text-xs text-slate-500 mt-1">
            เพิ่มสมาชิกและกรอกค่าใช้จ่ายด้านบน เพื่อเริ่มคำนวณและสรุปยอดจ่ายเกิน/จ่ายขาด
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {settlements.map((s) => {
            const isOverpaid = s.balance > 0.01;
            const isUnderpaid = s.balance < -0.01;
            const isBalanced = !isOverpaid && !isUnderpaid;

            return (
              <div
                key={s.memberId}
                className={`p-4 rounded-2xl border transition-all ${
                  isOverpaid
                    ? "bg-emerald-50/50 border-emerald-200/80 shadow-xs"
                    : isUnderpaid
                    ? "bg-rose-50/50 border-rose-200/80 shadow-xs"
                    : "bg-slate-50/60 border-slate-200/80"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${s.avatarColor} text-white flex items-center justify-center text-xs font-bold shadow-xs`}
                    >
                      {s.memberName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {s.memberName}
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        ควรจ่าย: ฿{s.fairShare.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {isOverpaid && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <span>🟢 จ่ายเกิน</span>
                    </span>
                  )}
                  {isUnderpaid && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                      <span>🔴 จ่ายขาด</span>
                    </span>
                  )}
                  {isBalanced && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-bold">
                      <span>⚪ จ่ายพอดี</span>
                    </span>
                  )}
                </div>

                {/* Numbers Breakdown */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-500 block">จ่ายไปแล้วทั้งหมด:</span>
                    <strong className="text-slate-800 font-bold text-sm">
                      ฿{s.totalPaid.toLocaleString("th-TH", { maximumFractionDigits: 2 })}
                    </strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      (น้ำมัน ฿{s.fuelPaid.toLocaleString("th-TH", { maximumFractionDigits: 0 })} + อื่นๆ ฿{s.otherPaid.toLocaleString("th-TH", { maximumFractionDigits: 0 })})
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-500 block">
                      {isOverpaid ? "ต้องได้รับคืน:" : isUnderpaid ? "ต้องจ่ายเพิ่ม:" : "สถานะสุทธิ:"}
                    </span>
                    <strong
                      className={`font-black text-base ${
                        isOverpaid
                          ? "text-emerald-600"
                          : isUnderpaid
                          ? "text-rose-600"
                          : "text-slate-600"
                      }`}
                    >
                      {isOverpaid && "+"}
                      {isUnderpaid && "-"}
                      ฿{Math.abs(s.balance).toLocaleString("th-TH", { maximumFractionDigits: 2 })}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Smart Debt Settlement (Who transfers to whom) */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-50/90 to-blue-50/70 border border-sky-200/70 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💸</span>
          <h3 className="text-sm font-bold text-slate-800">
            สรุปเส้นทางการโอนเงินเพื่อเคลียร์ยอด (Settlement)
          </h3>
        </div>

        {settlements.length === 0 ? (
          <p className="text-xs text-slate-500">
            ยังไม่มีข้อมูลสมาชิกเพื่อคำนวณการโอนเงิน
          </p>
        ) : transfers.length === 0 ? (
          <p className="text-xs text-slate-500">
            ยอดค่าใช้จ่ายลงตัวแล้ว ไม่มีผู้ที่ต้องโอนเงินเคลียร์ยอดระหว่างกัน
          </p>
        ) : (
          <div className="space-y-2">
            {transfers.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white/90 border border-sky-100 shadow-xs text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200/60">
                    {t.fromName}
                  </span>
                  <span className="text-slate-400">ต้องโอนให้</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                    {t.toName}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 self-end sm:self-auto font-black text-sky-800 text-sm sm:text-base">
                  <span>฿{t.amount.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</span>
                  <span className="text-xs font-normal text-slate-500">บาท</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
