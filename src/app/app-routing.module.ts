import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
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
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'critical-patients',
    loadChildren: () => import('./critical-patients/critical-patients.module').then( m => m.CriticalPatientsPageModule),
    canLoad: [AuthGuard]
  },
  // {
  //   path: 'patient-detail',
  //   loadChildren: () => import('./patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
