import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})
export class NewPatientPage implements OnInit {
  form: FormGroup;

  constructor(
    private patientService: PatientsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      imageUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      diagnosis: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      age: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(10)],
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      bodyTemperature: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      pulseRate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      respirationRate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      systolicBP: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      diastolicBP: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      o2Sat: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      isCritical: new FormControl(null, {
        updateOn: 'blur',
      }),
    });
  }

  onCreatePatient() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Adding patient...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.patientService
          .addPatient(
            this.form.value.title,
            this.form.value.imageUrl,
            this.form.value.diagnosis,
            +this.form.value.age,
            this.form.value.phone,
            this.form.value.email,
            this.form.value.address,
            this.form.value.description,
            +this.form.value.bodyTemperature,
            +this.form.value.pulseRate,
            +this.form.value.respirationRate,
            +this.form.value.systolicBP,
            +this.form.value.diastolicBP,
            +this.form.value.o2Sat,
            this.form.value.isCritical
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/home/tabs/patients']);
          });
      });
  }
}
