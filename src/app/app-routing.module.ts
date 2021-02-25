import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'critical-patients',
    loadChildren: () => import('./critical-patients/critical-patients.module').then( m => m.CriticalPatientsPageModule)
  },
  {
    path: 'patient-detail',
    loadChildren: () => import('./patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
