import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let authServiceSpy;

  beforeEach(() => {


    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientModule, FormsModule, RouterTestingModule],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up the user', () => {
    expect(service.userIsAuthenticated).toBeTruthy();
  });

  it('should get the user', () => {
    expect(service.userId).toBeTruthy();
  });
});
