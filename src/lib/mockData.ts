
import { Location, Prize, User, Voucher } from "@/types";

// Mock locations
export const mockLocations: Location[] = [
  {
    id: "loc1",
    name: "Dubai Mall",
    country: "UAE",
    qrCode: "dubai-mall-qr",
  },
  {
    id: "loc2",
    name: "Mall of the Emirates",
    country: "UAE",
    qrCode: "mall-of-emirates-qr",
  },
  {
    id: "loc3",
    name: "City Centre Mirdif",
    country: "UAE",
    qrCode: "city-centre-mirdif-qr",
  },
  {
    id: "loc4",
    name: "Riyadh Park",
    country: "Saudi Arabia",
    qrCode: "riyadh-park-qr",
  },
  {
    id: "loc5",
    name: "Red Sea Mall",
    country: "Saudi Arabia",
    qrCode: "red-sea-mall-qr",
  },
];

// Mock prizes
export const mockPrizes: Prize[] = [
  {
    id: "prize1",
    name: "Netflix Voucher",
    type: "netflix",
    imageUrl: "/prizes/netflix.png",
    probability: 10,
    available: 50,
  },
  {
    id: "prize2",
    name: "Shahid Voucher",
    type: "shahid",
    imageUrl: "/prizes/shahid.png",
    probability: 10,
    available: 50,
  },
  {
    id: "prize3",
    name: "Twix Voucher",
    type: "voucher",
    imageUrl: "/prizes/voucher.png",
    probability: 20,
    available: 100,
  },
  {
    id: "prize4",
    name: "Twix Sticker",
    type: "sticker",
    imageUrl: "/prizes/sticker.png",
    probability: 60,
    available: 500,
  },
];

// Mock vouchers
export const mockVouchers: Voucher[] = Array.from({ length: 50 }, (_, i) => ({
  id: `voucher${i + 1}`,
  code: `TWIX${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  type: ["netflix", "shahid", "voucher"][Math.floor(Math.random() * 3)] as "netflix" | "shahid" | "voucher",
  location: mockLocations[Math.floor(Math.random() * mockLocations.length)].id,
  country: ["UAE", "Saudi Arabia"][Math.floor(Math.random() * 2)],
  isRedeemed: Math.random() > 0.7,
}));

// Mock users
export const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => {
  const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];
  return {
    id: `user${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `+971${Math.floor(Math.random() * 1000000000)}`,
    location: location.id,
    country: location.country,
    registrationDate: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
    prizes: Math.random() > 0.3 ? [{
      id: mockPrizes[Math.floor(Math.random() * mockPrizes.length)].id,
      type: ["netflix", "shahid", "voucher", "sticker"][Math.floor(Math.random() * 4)],
      voucherCode: Math.random() > 0.5 ? `TWIX${Math.random().toString(36).substring(2, 10).toUpperCase()}` : undefined,
      date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
    }] : undefined,
  };
});

// Mock selecting a prize based on probabilities
export const selectRandomPrize = (): Prize => {
  // Create an array where each prize appears a number of times proportional to its probability
  const prizesPool: Prize[] = [];
  mockPrizes.forEach(prize => {
    if (prize.available > 0) {
      for (let i = 0; i < prize.probability; i++) {
        prizesPool.push(prize);
      }
    }
  });
  
  // Select a random prize from the pool
  const randomIndex = Math.floor(Math.random() * prizesPool.length);
  return prizesPool[randomIndex];
};
