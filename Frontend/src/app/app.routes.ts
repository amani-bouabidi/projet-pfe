import { Routes } from '@angular/router';

// ======================== Auth Importation ===========================

import { LoginComponent } from './auth/components/login/login';
import { RegisterComponent } from './auth/components/register/register';
import { RoleGuard } from './auth/guard/role-guard';

// ======================= Admin Importation ==========================

import { AdminComponent } from './admin/components/admin/admin';
import { AdminFormateursComponent} from './admin/components/formateurs/formateurs';
import { AdminApprenantsComponent } from './admin/components/apprenants/apprenants';
import { AdminFormationsComponent } from './admin/components/formations/formations';

// ====================== Formateur Importation =======================

import { FormateurComponent } from './components/formateur/formateur';

// ====================== Apprenant Importation =======================
import { ApprenantComponent } from './components/apprenant/apprenant';




export const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },





  //====================== Admin Routes ========================
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: {roles: ['ADMIN'] },
    children: [
      { path: 'apprenants', component:AdminApprenantsComponent },
      { path : 'formations', component: AdminFormationsComponent },
      { path: 'formateurs', component: AdminFormateursComponent },

    ]
  },

  //===================== Formateur Routes =========================
  {
    path: 'formateur',
    component: FormateurComponent,
    canActivate: [RoleGuard],
    data: {roles: ['FORMATEUR'] }
  },

  //===================== Apprenant Routes ==========================

  {
    path: 'apprenant',
    component: ApprenantComponent,
    canActivate: [RoleGuard],
    data: {roles: ['APPRENANT'] }
  },




];
