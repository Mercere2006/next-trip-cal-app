"use client";

import { useState } from "react";
import { Member } from "@/types/tripcal";

interface MemberSectionProps {
  members: Member[];
  onAddMember: (name: string) => void;
  onRemoveMember: (id: string) => void;
  memberExpenseTotals: Record<string, number>;
}

const AVATAR_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-sky-500 to-cyan-600",
  "from-teal-500 to-emerald-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-purple-500 to-violet-600",
  "from-indigo-500 to-blue-700",
];

export { AVATAR_COLORS };

export default function MemberSection({
  members,
  onAddMember,
  onRemoveMember,
  memberExpenseTotals,
}: MemberSectionProps) {
  const [newMemberName, setNewMemberName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAdd = () => {
    const trimmed = newMemberName.trim();
    if (!trimmed) {
      setErrorMsg("กรุณากรอกชื่อสมาชิก");
      return;
    }
    if (members.some((m) => m.name.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg("มีชื่อสมาชิกนี้ในทริปแล้ว");
      return;
    }
    onAddMember(trimmed);
    setNewMemberName("");
    setErrorMsg("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <section className="rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-900/5 p-5 sm:p-7 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 text-lg font-bold">
            👥
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              รายชื่อสมาชิกในทริป
            </h2>
            <p className="text-xs text-slate-500">
              เพิ่มหรือลบสมาชิกเพื่อหารค่าใช้จ่ายเฉลี่ยเท่ากัน
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold self-start sm:self-auto">
          <span>รวม</span>
          <span className="text-sky-600 font-bold">{members.length}</span>
          <span>คน</span>
        </div>
      </div>

      {/* Input Add Member Form */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => {
                setNewMemberName(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="พิมพ์ชื่อสมาชิก เช่น สมชาย"
              maxLength={30}
              className="w-full px-4 py-3 rounded-2xl border border-sky-200 bg-sky-50/40 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium text-sm transition-all"
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-sm font-semibold shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 transition-all shrink-0 cursor-pointer active:scale-95"
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
            <span className="hidden sm:inline">เพิ่มสมาชิก</span>
            <span className="sm:hidden">เพิ่ม</span>
          </button>
        </div>
        {errorMsg && (
          <p className="text-xs text-rose-500 mt-1.5 ml-1 flex items-center gap-1">
            <span>⚠️</span> {errorMsg}
          </p>
        )}
      </div>

      {/* Members List */}
      {members.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-sky-50/40 border border-dashed border-sky-200 text-slate-400">
          <span className="text-3xl block mb-2">👥</span>
          <p className="text-sm font-semibold text-slate-700">
            ยังไม่มีสมาชิกในทริป
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {members.map((member) => {
            const totalPaid = memberExpenseTotals[member.id] || 0;
            return (
              <div
                key={member.id}
                className="group flex items-center justify-between p-3 rounded-2xl bg-gradient-to-b from-sky-50/70 to-white/90 border border-sky-100/90 shadow-xs hover:shadow-md hover:border-sky-200 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${member.avatarColor} text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0`}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      ออกไปแล้ว{" "}
                      <span className="font-semibold text-sky-700">
                        ฿{totalPaid.toLocaleString("th-TH")}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveMember(member.id)}
                  title={`ลบ ${member.name}`}
                  className="opacity-60 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 p-1.5 rounded-xl transition-all cursor-pointer ml-2 shrink-0"
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
            );
          })}
        </div>
      )}
    </section>
  );
}
