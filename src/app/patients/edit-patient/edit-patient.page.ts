import { Component, OnDestroy, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Patient } from '../patients.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.page.html',
  styleUrls: ['./edit-patient.page.scss'],
})
export class EditPatientPage implements OnInit, OnDestroy {
  patient: Patient;
  form: FormGroup;
  private patientSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientsService: PatientsService,
    private navController: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // Map of all the parameters this route receives

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('patientId')) {

        this.navController.navigateBack('/home/tabs/patients');
        return;
      }
      const patientId = paramMap.get('patientId');
      this.patientSubscription = this.patientsService
        .getPatient(patientId)
        .subscribe((patient) => {
          this.patient = patient;
          this.form = new FormGroup({
            title: new FormControl(this.patient.title, {
              updateOn: 'blur',
              validators: [Validators.required],
            }),
            imageUrl: new FormControl(this.patient.imageUrl, {
              updateOn: 'blur',
              validators: [Validators.required],
            }),
            diagnosis: new FormControl(this.patient.diagnosis, {
              updateOn: 'blur',
              validators: [Validators.required],
            }),
            age: new FormControl(this.patient.age, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            phone: new FormControl(this.patient.phone, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(10)],
            }),
            email: new FormControl(this.patient.email, {
              updateOn: 'blur',
              validators: [
                Validators.required,
                Validators.email,
                Validators.pattern(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                ),
              ],
            }),
            address: new FormControl(this.patient.address, {
              updateOn: 'blur',
              validators: [Validators.required],
            }),
            description: new FormControl(this.patient.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(500)],
            }),
            bodyTemperature: new FormControl(this.patient.bodyTemperature, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            pulseRate: new FormControl(this.patient.pulseRate, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            respirationRate: new FormControl(this.patient.respirationRate, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            systolicBP: new FormControl(this.patient.systolicBP, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            diastolicBP: new FormControl(this.patient.diastolicBP, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            o2Sat: new FormControl(this.patient.o2Sat, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
            isCritical: new FormControl(this.patient.isCritical, {
              updateOn: 'blur',
            }),
          });
        });
    });
  }

  onUpdatePatient() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating patient...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.patientsService
          .updatePatient(
            this.patient.id,
            this.form.value.title,
            this.form.value.imageUrl,
            this.form.value.diagnosis,
            this.form.value.age,
            this.form.value.phone,
            this.form.value.email,
            this.form.value.address,
            this.form.value.description,
            this.form.value.bodyTemperature,
            this.form.value.pulseRate,
            this.form.value.respirationRate,
            this.form.value.systolicBP,
            this.form.value.diastolicBP,
            this.form.value.o2Sat,
            this.form.value.isCritical
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/home/tabs/patients']);

          });
      });
  }

  ngOnDestroy() {
    if (this.patient) {
      this.patientSubscription.unsubscribe();
    }
  }
}
