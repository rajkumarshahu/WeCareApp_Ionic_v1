import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.page.html',
  styleUrls: ['./new-patient.page.scss'],
})
export class NewPatientPage implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      imageUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      diagnosis: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      age: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(10)],

      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      bodyTemperature: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      pulseRate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      respirationRate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      systolicBP: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      diastolicBP: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      o2Sat: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      isCritical: new FormControl(null, {
        updateOn: 'blur'
      }),

    });
  }

  onCreateOffer() {

  }

}
