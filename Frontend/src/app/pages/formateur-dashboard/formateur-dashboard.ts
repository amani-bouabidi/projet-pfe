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
import { AuthService } from '../../auth/service/auth';
import { FormateurService } from '../../services/formateur';

@Component({
  selector: 'app-formateur-dashboard',
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
    MatTooltipModule
  ],
  templateUrl: './formateur-dashboard.html',
  styleUrls: ['./formateur-dashboard.scss']
})
export class FormateurDashboard implements OnInit {
  todayDate = new Date();
  userName = '';
  userEmail = '';

  stats = {
    totalFormations: 0,
    totalApprenants: 0,
    totalSessions: 0,
    tauxReussite: 0,
    sessionsMois: 0
  };

  prochainesSessions: any[] = [];
  dernieresEvaluations: any[] = [];

  constructor(
    private authService: AuthService,
    private formateurService: FormateurService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }


  logout(): void {
    this.authService.logout();
  }
}
