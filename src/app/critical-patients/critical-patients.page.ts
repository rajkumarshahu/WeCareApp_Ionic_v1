import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../patients/patients.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { PatientsService } from '../patients/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-critical-patients',
  templateUrl: './critical-patients.page.html',
  styleUrls: ['./critical-patients.page.scss'],
})
export class CriticalPatientsPage implements OnInit, OnDestroy {

  loadedPatients: Patient[]
  loadedCriticalPatients: Patient[]
  private criticalPatientsSub: Subscription;

  constructor(private patientsService: PatientsService, private router: Router) {}


  ngOnInit(){
    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    })
  }

  ionViewWillEnter() {
    this.criticalPatientsSub = this.patientsService.getAllCriticalPatients().subscribe(criticalPatients =>{
      this.loadedCriticalPatients = criticalPatients
    })
  }

  onEdit(patientId: string, slidingtItem: IonItemSliding) {
    slidingtItem.close()
    this.router.navigate(['/', 'home', 'tabs', 'patients', 'edit', patientId])
    console.log('Editing patient', patientId)
  }


  ngOnDestroy() {
    if(this.criticalPatientsSub) {
      this.criticalPatientsSub.unsubscribe()
    }
  }

}
