import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

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

      this.form = new FormGroup({
        title: new FormControl(this.patient.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        imageUrl: new FormControl(this.patient.imageUrl, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        diagnosis: new FormControl(this.patient.diagnosis, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        age: new FormControl(this.patient.age, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        phone: new FormControl(this.patient.phone, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(10)],

        }),
        email: new FormControl(this.patient.email, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]
        }),
        address: new FormControl(this.patient.address, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.patient.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(250)]
        }),
        bodyTemperature: new FormControl(this.patient.bodyTemperature, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        pulseRate: new FormControl(this.patient.pulseRate, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        respirationRate: new FormControl(this.patient.respirationRate, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        systolicBP: new FormControl(this.patient.systolicBP, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        diastolicBP: new FormControl(this.patient.diastolicBP, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        o2Sat: new FormControl(this.patient.o2Sat, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(1)]
        }),
        // isCritical: new FormControl(this.patient.isCritical, {
        //   updateOn: 'blur'
        // }),
      });
    });
  }

  onUpdatePatient() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }

}
