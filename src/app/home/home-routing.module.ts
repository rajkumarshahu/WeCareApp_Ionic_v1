import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
          },
          {
            path: ':patientId',
            loadChildren: () => import('../patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
          }

      ]
      },

      {
        path: 'patients',
        children: [
          {
            path: '',
            loadChildren: () => import('../patients/patients.module').then( m => m.PatientsPageModule)
          },
          {
            path: ':patientId',
            loadChildren: () => import('../patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
          }

      ]
      },
      {
        path: 'criticalPatients',
        children: [
          {
            path: '',
            loadChildren: () => import('../critical-patients/critical-patients.module').then( m => m.CriticalPatientsPageModule)
          },
          {
            path: ':patientId',
            loadChildren: () => import('../patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
          }

      ]
      }
      ,
      {
        path: '',
        redirectTo: '/home/tabs/dashboard',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
