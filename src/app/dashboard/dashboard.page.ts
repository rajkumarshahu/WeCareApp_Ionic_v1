import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  isLoading = false;

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){
    this.patientsSubcription = this.patientsService.patients.subscribe(patients => {
      this.loadedPatients = patients
    })

    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.patientsService.fetchPatients().subscribe(() => {
      this.isLoading = false;
    });

    this.patientsService.fetchPatients().subscribe(resp => {
      this.loadedCriticalPatients = this.loadedPatients.filter(p => p.isCritical);
     });
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
