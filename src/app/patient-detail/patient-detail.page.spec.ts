import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { routes } from '../app-routing.module';
import { PatientsService } from '../patients/patients.service';

import { PatientDetailPage } from './patient-detail.page';

describe('PatientDetailPage', () => {
  let service: PatientsService;
  let component: PatientDetailPage;
  let fixture: ComponentFixture<PatientDetailPage>;
  let mockRouter;
  beforeEach(waitForAsync(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ PatientDetailPage ],
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

    fixture = TestBed.createComponent(PatientDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the patients page after delete', () => {
    spyOn(component, 'onDeletePatient');
    let button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onDeletePatient()).toHaveBeenCalled();
      component.onDeletePatient();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/tabs/patients']);
    });
  });
});
