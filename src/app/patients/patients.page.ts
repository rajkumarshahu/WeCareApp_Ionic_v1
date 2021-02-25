import { Component, OnDestroy, OnInit } from '@angular/core';

import { Patient } from './patients.model'
import { PatientsService } from './patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit, OnDestroy {

  patients: Patient[];

  // Injecting PatientsService
  constructor(private patientsService: PatientsService) { } // in this way we can use PatientsService anywhere in the class and not just in the constructor

  ngOnInit() {
    console.log("ngOnInit")
  }

  ionViewWillEnter() {

    this.patients = this.patientsService.getAllPatient() // This returns all the patients

  }

  ngOnDestroy() {

  }
}
