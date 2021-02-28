import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  patients: Patient[];
  criticalPatients: Patient[]

  constructor(private patientsService: PatientsService) {}

  ngOnInit(){
    this.patients = this.patientsService.getAllPatient() // This returns all the patients

    this.criticalPatients = this.patientsService.getAllCriticalPatients()
  }

}
