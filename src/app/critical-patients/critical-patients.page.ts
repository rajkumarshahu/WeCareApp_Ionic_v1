import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../patients/patients.model';
import { PatientsService } from '../patients/patients.service';

@Component({
  selector: 'app-critical-patients',
  templateUrl: './critical-patients.page.html',
  styleUrls: ['./critical-patients.page.scss'],
})
export class CriticalPatientsPage implements OnInit, OnDestroy {

  loadedPatients: Patient[]
  loadedCriticalPatients: Patient[]
  private criticalPatientsSub: Subscription;

  constructor(private patientsService: PatientsService) {}


  ngOnInit(){
    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    })
  }


  ngOnDestroy() {
    if(this.loadedCriticalPatients) {
      this.criticalPatientsSub.unsubscribe()
    }
  }

}
