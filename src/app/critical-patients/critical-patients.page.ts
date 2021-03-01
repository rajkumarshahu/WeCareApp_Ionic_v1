import { Component, OnDestroy, OnInit } from '@angular/core';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-critical-patients',
  templateUrl: './critical-patients.page.html',
  styleUrls: ['./critical-patients.page.scss'],
})
export class CriticalPatientsPage implements OnInit, OnDestroy {

  criticalPatients: Patient[]

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){

  }

  ionViewWillLeave() {
    this.criticalPatients = this.patientsService.getAllCriticalPatients()
  }

  ngOnDestroy() {
    console.log("ngOnDestroy()")
  }

}
