import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthPage', () => {
  let guard: AuthGuard;
  // let fixture: ComponentFixture<AuthGuard>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGuard ],
      imports: [IonicModule.forRoot(), HttpClientModule, FormsModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();
    guard = TestBed.inject(AuthGuard);
    // fixture = TestBed.createComponent(AuthGuard);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));



  xit('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
