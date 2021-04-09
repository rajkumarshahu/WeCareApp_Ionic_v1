import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { PatientsService } from '../patients.service';

import { EditPatientPage } from './edit-patient.page';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { routes } from '../../app-routing.module'
import { Observable, of } from 'rxjs';
//import 'rxjs/add/observable/of';


describe('EditPatientPage', () => {
  let service: PatientsService;
  let component: EditPatientPage;
  let fixture: ComponentFixture<EditPatientPage>;
  let mockRouter;
  beforeEach(waitForAsync(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ EditPatientPage ],
      imports: [RouterTestingModule.withRoutes(routes), IonicModule.forRoot(), HttpClientModule, FormsModule, ReactiveFormsModule],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({patientId: "5d725a037b292f5f8ceff707"}))
         }
        },
      ],

    }).compileComponents();
    service = TestBed.inject(PatientsService);

    fixture = TestBed.createComponent(EditPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should check title is valid', () => {
    let title = component.form.controls['title'];
    expect(title.valid).toBeFalsy();
  });

  it('should check imageUrl is valid', () => {
    let imageUrl = component.form.controls['imageUrl'];
    expect(imageUrl.valid).toBeFalsy();
  });

  it('should check diagnosis is valid', () => {
    let diagnosis = component.form.controls['diagnosis'];
    expect(diagnosis.valid).toBeFalsy();
  });

  it('should check age is valid', () => {
    let age = component.form.controls['age'];
    expect(age.valid).toBeFalsy();
  });

  it('should check phone is valid', () => {
    let phone = component.form.controls['phone'];
    expect(phone.valid).toBeFalsy();
  });

  it('should check email is valid', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('should check address is valid', () => {
    let address = component.form.controls['address'];
    expect(address.valid).toBeFalsy();
  });

  it('should check description is valid', () => {
    let description = component.form.controls['description'];
    expect(description.valid).toBeFalsy();
  });

  it('should check bodyTemperature is valid', () => {
    let bodyTemperature = component.form.controls['bodyTemperature'];
    expect(bodyTemperature.valid).toBeFalsy();
  });

  it('should check pulseRate is valid', () => {
    let pulseRate = component.form.controls['pulseRate'];
    expect(pulseRate.valid).toBeFalsy();
  });

  it('should check respirationRate is valid', () => {
    let respirationRate = component.form.controls['respirationRate'];
    expect(respirationRate.valid).toBeFalsy();
  });

  it('should check systolicBP is valid', () => {
    let systolicBP = component.form.controls['systolicBP'];
    expect(systolicBP.valid).toBeFalsy();
  });

  it('should check diastolicBP is valid', () => {
    let diastolicBP = component.form.controls['diastolicBP'];
    expect(diastolicBP.valid).toBeFalsy();
  });

  it('should check o2Sat is valid', () => {
    let o2Sat = component.form.controls['o2Sat'];
    expect(o2Sat.valid).toBeFalsy();
  });

  it('should check isCritical is valid', () => {
    let isCritical = component.form.controls['isCritical'];
    expect(isCritical.valid).toBeTruthy();
  });

  it('should contain form with 15 controls', () => {

    expect(component.form.contains('title')).toBeTruthy();
    expect(component.form.contains('imageUrl')).toBeTruthy();
    expect(component.form.contains('diagnosis')).toBeTruthy();
    expect(component.form.contains('age')).toBeTruthy();
    expect(component.form.contains('phone')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('address')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
    expect(component.form.contains('bodyTemperature')).toBeTruthy();
    expect(component.form.contains('pulseRate')).toBeTruthy();
    expect(component.form.contains('respirationRate')).toBeTruthy();
    expect(component.form.contains('systolicBP')).toBeTruthy();
    expect(component.form.contains('diastolicBP')).toBeTruthy();
    expect(component.form.contains('o2Sat')).toBeTruthy();
    expect(component.form.contains('isCritical')).toBeTruthy();
  });

  it('should redirect the user to the patients page after update', () => {
    spyOn(component, 'onUpdatePatient');
    let button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onUpdatePatient()).toHaveBeenCalled();
      component.onUpdatePatient();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/tabs/patients']);
    });
  });


  // it('should redirect the user to the patients page after update', inject([Router], (router: Router) => {
  //   // spyOn(router, 'navigate').and.stub();
  //   router.navigate(['/home/tabs/patients']);
  //   component.onUpdatePatient();
  //   const spy = spyOn(router, 'navigate');
  //   console.log('>>>', router.navigate)
  //   expect(spy).toHaveBeenCalledWith(['/home/tabs/patients']);
  // }));
});
