import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit, OnDestroy {
  patient: Patient;
  patientSubscription: Subscription;

  // Injecting activated route form @angular/router which we can use in ngOnInit()
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private router: Router, // inject router to leave the page after deleting the patient
    private alertController: AlertController,
    private navController: NavController
  ) {}

  ngOnInit() {
    // Map of all the parameters this route receives
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('patientId')) {
        this.navController.navigateBack('/home/tabs/patients');
        return;
      }
      const patientId = paramMap.get('patientId');
      this.patientSubscription = this.patientsService.getPatient(patientId).subscribe(patient => {
        this.patient = patient;
      });
    });
  }


  ngOnDestroy () {
    if (this.patientSubscription) {
      this.patientSubscription.unsubscribe();
    }
  }

  onDeletePatient() {
    this.alertController
      .create({
        header: 'Are you sure?',
        message: 'Do you really want to delete the patient?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
               // use allPatientsService and use deletePatient method
          this.patientsService.deletePatient(this.patient.id);
          this.router.navigate(['/home/tabs/patients']); // navigating back to patients page after deleting patient
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
