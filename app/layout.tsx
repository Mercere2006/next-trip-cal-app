import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "เว็บคำนวณค่าเดินทาง | TripCal",
  description: "เว็บคำนวณค่าเดินทาง โปรแกรมช่วยคำนวณและวางแผนการเดินทาง สะดวกรวดเร็วและแม่นยำ",
  keywords: ["คำนวณค่าเดินทาง", "โปรแกรมคำนวณค่าเดินทาง", "เว็บคำนวณค่าเดินทาง", "TripCal"],
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
