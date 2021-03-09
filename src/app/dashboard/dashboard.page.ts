import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthPage } from '../auth/auth.page';
import { AuthService } from '../auth/auth.service';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  userName: String;
  loadedPatients: Patient[];
  loadedCriticalPatients: Patient[]
  patientCount: Number;
  criticalPatientCount: Number;
  private criticalPatientsSub: Subscription
  private patientsSubcription: Subscription

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){
    this.patientsSubcription = this.patientsService.patients.subscribe(patients => {
      this.loadedPatients = patients
    })

    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    });
  }

  ionViewWillEnter(){
    this.patientsSubcription = this.patientsService.patients.subscribe(patients => {
      this.loadedPatients = patients
    })

    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    });
    console.log("ionViewWillEnter()")
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad()")
  }

  ngOnDestroy() {

    if(this.patientsSubcription){
      this.patientsSubcription.unsubscribe()
    }

    if(this.criticalPatientsSub) {
      this.criticalPatientsSub.unsubscribe
    }
  }
}
