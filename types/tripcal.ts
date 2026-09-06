export interface Member {
  id: string;
  name: string;
  avatarColor: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  paidById: string;
  category?: string;
  createdAt: number;
}

export interface FuelConfig {
  distance: number;       // ระยะทางรวม (กม.)
  consumption: number;    // อัตราสิ้นเปลือง (กม./ลิตร)
  pricePerLiter: number;  // ราคาน้ำมัน (บาท/ลิตร)
  paidById: string;       // ผู้จ่ายค่าน้ำมัน (หรือ 'none' หากยังไม่มีใครจ่ายคนเดียว)
}

export interface MemberSettlement {
  memberId: string;
  memberName: string;
  avatarColor: string;
  fuelPaid: number;
  otherPaid: number;
  totalPaid: number;
  fairShare: number;
  balance: number;        // > 0 = จ่ายเกิน (ต้องได้คืน), < 0 = จ่ายขาด (ต้องจ่ายเพิ่ม)
}

export interface TransferSuggestion {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
}
