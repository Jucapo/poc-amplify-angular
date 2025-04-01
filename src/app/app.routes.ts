import { Routes } from '@angular/router';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
