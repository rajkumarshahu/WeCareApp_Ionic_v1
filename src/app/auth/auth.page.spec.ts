import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthPage } from './auth.page';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;


  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ AuthPage ],
      imports: [IonicModule.forRoot(), HttpClientModule, FormsModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user', () =>{
    expect(component.isLogin).toBeTruthy();
  })



});
