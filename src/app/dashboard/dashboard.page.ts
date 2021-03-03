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

  loadedPatients: Patient[];
  loadedCriticalPatients: Patient[]
  patientCount: Number;
  criticalPatientCount: Number;
  private criticalPatientsSub: Subscription
  private patientsSubcription: Subscription

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){
    // this.patientCount = this.patientsService.patients.length
    // this.criticalPatientCount = this.patientsService.getAllCriticalPatients().length

    this.patientsSubcription = this.patientsService.patients.subscribe(patients => {
      this.loadedPatients = patients
    })

    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    })

    console.log("ngOnInit")
  }


  ionViewWillEnter() {
    console.log("ionViewWillEnter")
  }

  ionViewDidEnter() {

    // this.criticalPatients = this.patientsService.getAllCriticalPatients()
    console.log("ionViewDidEnter")
  }

  ionViewWillLeave() {

    console.log("ionViewWillLeave")
  }

  ionViewDidLeave() {

    console.log("ionViewDidLeave")
  }

  ngOnDestroy() {

    if(this.criticalPatientsSub) {
      this.criticalPatientsSub.unsubscribe
    }

    if(this.patientsSubcription){
      this.patientsSubcription.unsubscribe()
    }
    console.log("ngOnDestroy")
  }

}
