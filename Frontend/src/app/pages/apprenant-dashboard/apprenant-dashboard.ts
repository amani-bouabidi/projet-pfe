import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/auth';
import { ApprenantService } from '../../services/apprenant';

// Interface pour les stats du dashboard
interface DashboardStats {
  formationsEnCours: number;
  formationsTerminees: number;
  progressionMoyenne: number;
  certificatsObtenus: number;
}

// Interface pour les formations récentes (simplifiée)
interface FormationRecente {
  id: number;
  titre: string;
  description: string;
  progression: number;
}

// Interface pour les notifications récentes (simplifiée)
interface NotificationRecente {
  id: number;
  titre: string;
  message: string;
  date: string;
  lue: boolean;
  type: 'SUCCESS' | 'WARNING' | 'INFO';
}

@Component({
  selector: 'app-apprenant-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './apprenant-dashboard.html',
  styleUrls: ['./apprenant-dashboard.scss']
})
export class ApprenantDashboard implements OnInit {
  todayDate = new Date();
  userName = '';
  userEmail = '';
  notificationsCount = 0;

  stats: DashboardStats = {
    formationsEnCours: 0,
    formationsTerminees: 0,
    progressionMoyenne: 0,
    certificatsObtenus: 0
  };

  formationsRecentes: FormationRecente[] = [];
  notificationsRecentes: NotificationRecente[] = [];

  constructor(
    private authService: AuthService,
    private apprenantService: ApprenantService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }
}
