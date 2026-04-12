import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { RoleGuard } from './guard/role-guard';

// Admin Components
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { ApprenantsComponent } from './pages/admin/apprenants/apprenants';
import { FormateursComponent } from './pages/admin/formateurs/formateurs';
import { FormationsComponent } from './pages/admin/formations/formations';

// Formateur Components
import { FormateurDashboard } from './pages/formateur-dashboard/formateur-dashboard';
import { Formations } from './pages/formateur/formations/formations';
import { ApprenantsFormateur } from './pages/formateur/apprenants/apprenants';
import { Sessions } from './pages/formateur/sessions/sessions';
import { Evaluations } from './pages/formateur/evaluations/evaluations';
import { Prerequis } from './pages/formateur/prerequis/prerequis';
import { Statistiques } from './pages/formateur/statistiques/statistiques';

// Apprenant Components
import { ApprenantDashboard } from './pages/apprenant-dashboard/apprenant-dashboard';
import { Cours } from './pages/apprenant/cours/cours';
import { CoursDetails } from './pages/apprenant/cours-details/cours-details';
import { Favoris } from './pages/apprenant/favoris/favoris';
import { ModuleDetail } from './pages/apprenant/module-detail/module-detail';
import { Notes } from './pages/apprenant/notes/notes';
import { Notifications } from './pages/apprenant/notifications/notifications';
import { Progression } from './pages/apprenant/progression/progression';


// Public Components
import { Catalogue } from './pages/public/catalogue/catalogue';

export const routes: Routes = [
  { path: '', redirectTo: '/public/catalogue', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin routes
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'apprenants', component: ApprenantsComponent },
      { path: 'formateurs', component: FormateursComponent },
      { path: 'formations', component: FormationsComponent }
    ]
  },

  // Formateur routes
  {
    path: 'formateur',
    canActivate: [RoleGuard],
    data: { roles: ['FORMATEUR'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: FormateurDashboard },
      { path: 'formations', component: Formations },
      { path: 'apprenants', component: ApprenantsFormateur },
      { path: 'sessions', component: Sessions },
      { path: 'evaluations', component: Evaluations },
      { path: 'prerequis', component: Prerequis },
      { path: 'statistiques', component: Statistiques }
    ]
  },

  // Apprenant routes
  {
    path: 'apprenant',
    canActivate: [RoleGuard],
    data: { roles: ['APPRENANT'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ApprenantDashboard },
      { path: 'cours', component: Cours },
      { path: 'cours/:id', component: CoursDetails },
      { path: 'modules/:id', component: ModuleDetail },
      { path: 'favoris', component: Favoris },
      { path: 'progression', component: Progression },
      { path: 'notes', component: Notes },
      { path: 'sessions', component: Sessions },
      { path: 'notifications', component: Notifications }
    ]
  },

  // Public routes
  {
    path: 'public',
    children: [
      { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
      { path: 'catalogue', component: Catalogue }
    ]
  },

  { path: '**', redirectTo: '/public/catalogue' }
];
