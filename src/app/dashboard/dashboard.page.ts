import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  patients: Patient[];
  criticalPatients: Patient[]
  patientCount: Number;
  criticalPatientCount: Number;

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){
    this.patientCount = this.patientsService.getAllPatient().length
    this.criticalPatientCount = (this.patientsService.getAllCriticalPatients().length)
  }

  ionViewWillEnter() {
    //this.patients = this.patientsService.getAllPatient() // This returns all the patients
    this.criticalPatients = this.patientsService.getAllCriticalPatients()
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
