import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "เว็บคำนวณค่าผ่อนชำระรายเดือน | LoanCal",
  description: "เว็บคำนวณค่าผ่อนชำระรายเดือน โปรแกรมช่วยคำนวณและวางแผนการผ่อนสินเชื่อ สะดวกรวดเร็วและแม่นยำ",
  keywords: ["คำนวณสินเชื่อ", "ค่างวดผ่อนชำระ", "เว็บคำนวณค่าผ่อนชำระรายเดือน", "คำนวณดอกเบี้ย", "LoanCal"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${kanit.className}`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
