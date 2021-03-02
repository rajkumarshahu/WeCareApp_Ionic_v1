import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

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
  constructor(private patientsService: PatientsService, private router: Router) {

  } // in this way we can use PatientsService anywhere in the class and not just in the constructor

  ngOnInit() {
    console.log("ngOnInit")
// this.patients = this.patientsService.getAllPatient() // This returns all the patients
  }

  ionViewWillEnter() {

    console.log("ionViewWillEnter")
  }

  ionViewDidEnter() {
    this.patients = this.patientsService.getAllPatient() // This returns all the patients

    console.log("ionViewDidEnter")
  }

  ionViewWillLeave() {
  //  this.patients = this.patientsService.getAllPatient() // This returns all the patients
    console.log("ionViewWillLeave")
  }

  ionViewDidLeave() {

    //this.patients = this.patientsService.getAllPatient() // This returns all the patients
    console.log("ionViewDidLeave")
  }

  ngOnDestroy() {

    console.log("ngOnDestroy")
  }

  onEdit(patientId: string, slidingtItem: IonItemSliding) {
    slidingtItem.close()
    this.router.navigate(['/', 'home', 'tabs', 'patients', 'edit', patientId])
    console.log('Editing patient', patientId)
  }
}
