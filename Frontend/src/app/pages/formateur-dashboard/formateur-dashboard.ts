import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormateurService } from '../../services/formateur';

@Component({
  selector: 'app-formateur-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formateur-dashboard.html',
  styleUrls: ['./formateur-dashboard.scss']
})
export class FormateurDashboard implements OnInit {
  userName = '';
  userEmail = '';
  stats = {
    totalFormations: 0,
    totalApprenants: 0,
    totalSessions: 0
  };
  isLoading = true;

  constructor(
    private authService: AuthService,
    private formateurService: FormateurService,
    private router: Router
  ) {
    this.userName = this.authService.getUserName() || 'Formateur';
    this.userEmail = this.authService.getUserEmail() || '';
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    this.formateurService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading stats', err);
        this.isLoading = false;
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return 'F';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
