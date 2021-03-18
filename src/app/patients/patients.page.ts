import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Patient } from './patients.model'
import { PatientsService } from './patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit, OnDestroy {

  patients: Patient[];
  isLoading = false;
  private patientsSubcription: Subscription;

  // Injecting PatientsService
  constructor(private patientsService: PatientsService, private router: Router) {

  } // in this way we can use PatientsService anywhere in the class and not just in the constructor

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.isLoading = true;

   this.patientsService.fetchPatients().subscribe(resp => {
    this.patients  = resp["data"];
    this.isLoading = false

      //console.log(resp["data"]);

   });
    // this.patientsSubcription = this.patientsService.patients.subscribe(patients => {
    //   this.patients = patients
    // })
    // this.isLoading = true;
    // alert(this.patientsService.fetchPatients())
    //this.patients = this.patientsService.fetchPatients();
  }

  ionViewDidEnter() {
    // this.isLoading = true;
    // this.patientsService.fetchPatients().subscribe(() => {
    //   this.isLoading = false;
    // });
  }


  ngOnDestroy() {
    if(this.patientsSubcription) {
      this.patientsSubcription.unsubscribe();
    }
  }

  onEdit(patient: Patient, slidingtItem: IonItemSliding) {
    this.patientsService.patient = patient;
    slidingtItem.close()
    this.router.navigate(['/', 'home', 'tabs', 'patients', 'edit', 0])
    //console.log('Editing patient', patientId)
  }
}
