import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Patient } from '../patients.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.page.html',
  styleUrls: ['./edit-patient.page.scss'],
})
export class EditPatientPage implements OnInit {

  patient: Patient;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private navController: NavController
  ) { }

  ngOnInit() {
    // Map of all the parameters this route receives
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('patientId')) {
        this.navController.navigateBack('/home/tabs/patients');
        return;
      }
      const patientId = paramMap.get('patientId');
      this.patient = this.patientsService.getPatient(patientId);
    });
  }

}
