import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { Patient } from './patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private _patients = new BehaviorSubject<Patient[]>([
    {
      id: 'p1',
      title: 'John Doe',
      age: 67,
      imageUrl: 'https://api-wecare.herokuapp.com/uploads/johndoe.jpg',
      phone: '(111) 111-1111',
      email: 'johndoe@gmail.com',
      address: '233 Bay Street Toronto Ontario M4Y 1GX',
      diagnosis: 'Aortic Aneurysm',
      description:
        'Needs attention!!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, odo consequat.',
      bodyTemperature: 37,
      pulseRate: 67,
      respirationRate: 18,
      systolicBP: 100,
      diastolicBP: 140,
      o2Sat: 92,
      isCritical: false,
      userId: 'u1',
    },
    {
      id: 'p2',
      title: 'Jane Smith',
      age: 57,
      imageUrl: 'https://api-wecare.herokuapp.com/uploads/jane-smith.jpg',
      phone: '(222) 222-2222',
      email: 'janesmith@gmail.com',
      address: '240 Bloor St Toronto Ontario M4Y 1GX',
      diagnosis: 'Arthritis',
      description:
        'Severe joint pain !!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      bodyTemperature: 38,
      pulseRate: 79,
      respirationRate: 22,
      systolicBP: 120,
      diastolicBP: 128,
      o2Sat: 90,
      isCritical: false,
      userId: 'u1',
    },
    {
      id: 'p3',
      title: 'Olli Hamptonh',
      age: 44,
      imageUrl: 'https://api-wecare.herokuapp.com/uploads/olli-hamp.jpg',
      phone: '(333) 333-3333',
      email: 'ollihampton@gmail.com',
      address: '250 Wellesley Street East Toronto Ontario M4Y 1GX',
      diagnosis: 'Venous thromboembolism (VTE)',
      description:
        'Clots developed in the lower leg!!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      bodyTemperature: 34,
      pulseRate: 89,
      respirationRate: 16,
      systolicBP: 80,
      diastolicBP: 120,
      o2Sat: 88,
      isCritical: true,
      userId: 'u1',
    },
    {
      id: 'p4',
      title: 'Emre Hamilton',
      age: 74,
      imageUrl: 'https://api-wecare.herokuapp.com/uploads/emre.jpg',
      phone: '(444) 444-4444',
      email: 'emre@gmail.com',
      address: '2 Grosvenor Street Toronto Ontario M4Y 1GX',
      diagnosis: "Alzheimer's Disease",
      description:
        'Mild memory loss!!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      bodyTemperature: 36,
      pulseRate: 88,
      respirationRate: 24,
      systolicBP: 98,
      diastolicBP: 150,
      o2Sat: 92,
      isCritical: true,
      userId: 'u1',
    },
    {
      id: 'p5',
      title: 'Laurie Hook',
      age: 39,
      imageUrl: 'https://api-wecare.herokuapp.com/uploads/laurie.jpg',
      phone: '(555) 555-5555',
      email: 'laurie@gmail.com',
      address: '350 Parliament Street Toronto Ontario M4Y 1GX',
      diagnosis: 'E.coli infection',
      description:
        'Severe stomach cramps, diarrhea (often bloody), and vomiting.!!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      bodyTemperature: 36,
      pulseRate: 98,
      respirationRate: 20,
      systolicBP: 100,
      diastolicBP: 140,
      o2Sat: 95,
      isCritical: false,
      userId: 'u1',
    },
  ]) ;

  constructor(private authService: AuthService) {}

  get patients() {
    return this._patients.asObservable();
  }

  getAllCriticalPatients() {
    return this._patients.pipe(
      take(1),
      map(patients => {
        return [
          ...(patients = patients.filter((_patient) => {
            return _patient.isCritical === true;
          })),
        ];
      })
    )


  }

  // This method returns single patient for patientId
  getPatient(patientId: string) {
    return this._patients.pipe(
      take(1),
      map(patients => {
        return { ...patients.find(patient => patient.id === patientId)}
      })
    )
  }

  addPatient(
    title: string,
    imageUrl: string,
    diagnosis: string,
    age: number,
    phone: string,
    email: string,
    address: string,
    description: string,
    bodyTemperature: number,
    pulseRate: number,
    respirationRate: number,
    systolicBP: number,
    diastolicBP: number,
    o2Sat: number,
    isCritical: boolean
  ) {
    const newPatient = new Patient(
      Math.random.toString(),
      title,
      imageUrl,
      diagnosis,
      age,
      phone,
      email,
      address,
      description,
      bodyTemperature,
      pulseRate,
      respirationRate,
      systolicBP,
      diastolicBP,
      o2Sat,
      isCritical,
      this.authService.userId
    );
    return this.patients.pipe(take(1), delay(1000), tap( patients => {

        this._patients.next(patients.concat(newPatient));

    }));
  }

  updatePatient(
    patientId: string,
    title: string,
    imageUrl: string,
    diagnosis: string,
    age: number,
    phone: string,
    email: string,
    address: string,
    description: string,
    bodyTemperature: number,
    pulseRate: number,
    respirationRate: number,
    systolicBP: number,
    diastolicBP: number,
    o2Sat: number,
    isCritical: boolean
  ) {
    return this.patients.pipe(
      take(1), // take(1) gets the latest snapshot of the list
      delay(1000),
      tap(patients => {
        const updatedPatientIndex = patients.findIndex(p => p.id === patientId);
        const updatedPatients = [...patients];
        const oldPatient = updatedPatients[updatedPatientIndex];
        updatedPatients[updatedPatientIndex] = new Patient(
          oldPatient.id,
          title,
          imageUrl,
          diagnosis,
          age,
          phone,
          email,
          address,
          description,
          bodyTemperature,
          pulseRate,
          respirationRate,
          systolicBP,
          diastolicBP,
          o2Sat,
          isCritical,
          oldPatient.userId
        );
        this._patients.next(updatedPatients); //  Emit new list of patients
      })
    )
  }

  deletePatient(patientId: string) {
    return this._patients.pipe(
      take(1),
      delay(2000),
      tap(patients => {
        this._patients.next(patients.filter(p => p.id !== patientId))
      })
    )
  }
}
