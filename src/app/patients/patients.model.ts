export interface Patient {
  id: string;
  title: string;
  imageUrl: string;
  diagnosis: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  description: string;
  bodyTemperature: number;
  pulseRate: number;
  respirationRate: number;
  systolicBP: number;
  diastolicBP: number;
  o2Sat: number;
  isCritical: boolean;
}
