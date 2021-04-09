import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { PatientsService } from '../patients/patients.service';

import { CriticalPatientsPage } from './critical-patients.page';

describe('CriticalPatientsPage', () => {
  let service: PatientsService;
  let component: CriticalPatientsPage;
  let fixture: ComponentFixture<CriticalPatientsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalPatientsPage ],
      imports: [IonicModule.forRoot(), HttpClientModule, FormsModule, RouterTestingModule],
    }).compileComponents();
    service = TestBed.inject(PatientsService);
    fixture = TestBed.createComponent(CriticalPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all critical patients', () => {
    expect(service.getAllCriticalPatients().subscribe(patients => {
      patients = patients
    })).toBeTruthy();
  });

  it('should return critical patients as an array', () => {
    expect(component.loadedCriticalPatients.length).toBeDefined()
  });


});
