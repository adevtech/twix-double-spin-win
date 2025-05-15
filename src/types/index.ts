
export type Location = {
  id: string;
  name: string;
  country: string;
  qrCode: string;
};

export type Prize = {
  id: string;
  name: string;
  type: "netflix" | "shahid" | "voucher" | "sticker";
  imageUrl: string;
  probability: number; // 1-100
  available: number;
};

export type Voucher = {
  id: string;
  code: string;
  type: string;
  location: string;
  country: string;
  isRedeemed: boolean;
  redeemedBy?: string; // User ID
  redeemedAt?: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  country: string;
  registrationDate: Date;
  prizes?: {
    id: string;
    type: string;
    voucherCode?: string;
    date: Date;
  }[];
};

export type Admin = {
  id: string;
  email: string;
  name: string;
};
