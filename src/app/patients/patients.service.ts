import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { Patient } from './patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private _patients = new BehaviorSubject<Patient[]>([]) ;

 get patients() {
    return this._patients.asObservable();
  }


  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPatients() {
    return this.http.get('https://api-wecare.herokuapp.com/patients')
    .pipe(
        map(resData => {
          const patients = resData["data"];
          return patients;
        }),
        tap(patients => {
          this._patients.next(patients);
        })
      );
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
    let generatedId: string;
    let newPatient: Patient;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('No user found!');
        } newPatient = new Patient(
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
      userId
    );
    return this.http
      .post<{ name: string }>(
        'https://api-wecare.herokuapp.com/patients',
        {
          ...newPatient,
          id: null
        }
      );
      }),

        switchMap(resData => {
          generatedId = resData.name;
          return this.patients;
        }),
        take(1),
        tap(patients => {
          newPatient.id = generatedId;
          this._patients.next(patients.concat(newPatient));
        })

    // return this.patients.pipe(take(1), delay(1000), tap( patients => {

    //     this._patients.next(patients.concat(newPatient));

    // }));
      )

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
    let updatedPatients: Patient[];
    return this.patients.pipe(
      take(1), // take(1) gets the latest snapshot of the list
      //delay(1000),
      switchMap(patients => {
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
        return this.http.put(
          `https://api-wecare.herokuapp.com/patients/${patientId}`,
          { ...updatedPatients[updatedPatientIndex], id: null }
        );

      }),
      tap(() => {
        this._patients.next(updatedPatients);
      })
    )
  }

  deletePatient(patientId: string) {
    return this.http
      .delete(
        `https://api-wecare.herokuapp.com/patients/${patientId}`
      )
      .pipe(
        switchMap(() => {
          return this.patients;
        }),
        take(1),
        tap(patients => {
          this._patients.next(patients.filter(b => b.id !== patientId));
        })
      );
  }
}
