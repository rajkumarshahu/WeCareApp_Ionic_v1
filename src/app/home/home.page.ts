import { Component, OnInit } from '@angular/core';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  patients: Patient[];
  criticalPatients: Patient[]

  constructor(private patientsService: PatientsService) {}

  ngOnInit(){
    this.patients = this.patientsService.getAllPatient() // This returns all the patients

    this.criticalPatients = this.patientsService.getAllCriticalPatients()
  }

}
