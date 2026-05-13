//tool type
export interface Tool {
  id: string;
  name: string;
  plan: string;

  seats: number;
  pricePerSeat: number;
}