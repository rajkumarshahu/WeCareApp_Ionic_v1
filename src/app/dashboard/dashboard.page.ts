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
  //patients: Patient[];
  userName: String;
  loadedPatients: Patient[] = [];
  loadedCriticalPatients: Patient[] = [];
  patientCount: Number;
  criticalPatientCount: Number;
  private criticalPatientsSub: Subscription
  private patientsSubcription: Subscription
  isLoading: false;

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){

    this.patientsService.fetchPatients().subscribe(resp => {
      this.loadedPatients  = resp["data"];
      this.loadedCriticalPatients = this.loadedPatients.filter(p => p.isCritical);
     });

  }

  ionViewWillEnter() {

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
