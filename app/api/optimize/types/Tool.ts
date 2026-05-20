//tool type
export interface Tool {
  id: string;
  name: string;
  plan: string;
  monthlyCost?:number;
  seats: number;
  pricePerSeat: number;
}