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
  private patientsSubcription: Subscription;
  isLoading = false;


  // Injecting PatientsService
  constructor(private patientsService: PatientsService, private router: Router) {

  } // in this way we can use PatientsService anywhere in the class and not just in the constructor

  ngOnInit() {
    this.patientsSubcription = this.patientsService.patients.subscribe(patients => {
      this.patients = patients
    }) // This returns all the patients
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.patientsService.fetchPatients().subscribe(() => {
      this.isLoading = false;
    });
  }


  ngOnDestroy() {
    if(this.patientsSubcription) {
      this.patientsSubcription.unsubscribe();
    }
  }

  onEdit(patientId: string, slidingtItem: IonItemSliding) {
    slidingtItem.close()
    this.router.navigate(['/', 'home', 'tabs', 'patients', 'edit', patientId])
    console.log('Editing patient', patientId)
  }
}
