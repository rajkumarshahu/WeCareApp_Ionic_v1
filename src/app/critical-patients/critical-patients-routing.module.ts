import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriticalPatientsPage } from './critical-patients.page';

const routes: Routes = [
  {
    path: '',
    component: CriticalPatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriticalPatientsPageRoutingModule {}
