import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import {  Observable, from } from 'rxjs';

import { PatientsPage } from './patients.page';
import { PatientsService } from './patients.service';

describe('PatientsPage', () => {
  let component: PatientsPage;
  let fixture: ComponentFixture<PatientsPage>;
  let service: PatientsService;

  beforeEach(waitForAsync(() => {
    service = new PatientsService(null, null)
    component = new PatientsPage(service, null)
    TestBed.configureTestingModule({
      declarations: [ PatientsPage ],
      imports: [IonicModule.forRoot(), HttpClientModule, FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should render title', () => {
    component.patients.map( patient => {
      return patient.email = "raj@raj.com"
    });

    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('email'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('raj@raj.com')

  });

  it('should return patients as an array', () => {
    spyOn(service, 'fetchPatients').and.callFake( () => {
      return from([[{
        imageUrl: "https://api-wecare.herokuapp.com/uploads/johndoe.jpg",
        isCritical: true,
        //_id: "5d725a037b292f5f8ceff707",
        title: "Johne D",
        age: 67,
        phone: "(111) 111-1111",
        email: "johndoe@gmail.com",
        address: "233 Bay Street Toronto Ontario M4Y 1GX",
        diagnosis: "Aortic Aneurysm",
        description: "Needs attention!!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, odo consequat.",
        bodyTemperature: 37,
        pulseRate: 67,
        respirationRate: 18,
        systolicBP: 100,
        diastolicBP: 140,
        o2Sat: 92,
        createdAt: "2021-03-18T21:42:56.042Z",
        id: "5d725a037b292f5f8ceff707"
        }]])
    })
    component.ngOnInit();
    expect(component.patients.length).toBeDefined();
  });

});
