// export interface Patient {
//   id: string;
//   title: string;
//   imageUrl: string;
//   diagnosis: string;
//   age: number;
//   phone: string;
//   email: string;
//   address: string;
//   description: string;
//   bodyTemperature: number;
//   pulseRate: number;
//   respirationRate: number;
//   systolicBP: number;
//   diastolicBP: number;
//   o2Sat: number;
//   isCritical: boolean;
// }

export class Patient {
  constructor(
    public id: string,
    public title: string,
    public imageUrl: string,
    public diagnosis: string,
    public age: number,
    public phone: string,
    public email: string,
    public address: string,
    public description: string,
    public bodyTemperature: number,
    public pulseRate: number,
    public respirationRate: number,
    public systolicBP: number,
    public diastolicBP: number,
    public o2Sat: number,
    public isCritical: boolean,
    public userId: string
  ) {}
}
