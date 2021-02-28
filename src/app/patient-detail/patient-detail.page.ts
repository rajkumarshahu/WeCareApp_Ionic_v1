import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit {
  loadedPatient: Patient;

  // Injecting activated route form @angular/router which we can use in ngOnInit()
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private router: Router, // inject router to leave the page after deleting the patient
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Map of all the parameters this route receives
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('patientId')) {
        // redirect
        return;
      }
      const patientId = paramMap.get('patientId');
      this.loadedPatient = this.patientsService.getPatient(patientId);
    });
  }

  ionViewWillEnter() {

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
    this.patientsService.deletePatient(this.loadedPatient.id);
    this.router.navigate(['/home/tabs/patients']); // navigating back to all-patients page after deleting patient
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

}
