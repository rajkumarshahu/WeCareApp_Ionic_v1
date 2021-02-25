import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDetailPage } from './patient-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PatientDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDetailPageRoutingModule {}
