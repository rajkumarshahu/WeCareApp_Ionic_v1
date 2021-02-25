import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriticalPatientsPageRoutingModule } from './critical-patients-routing.module';

import { CriticalPatientsPage } from './critical-patients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriticalPatientsPageRoutingModule
  ],
  declarations: [CriticalPatientsPage]
})
export class CriticalPatientsPageModule {}
