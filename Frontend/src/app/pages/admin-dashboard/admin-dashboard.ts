import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboard implements OnInit {
  userName = '';
  userEmail = '';
  stats = {
    totalFormateurs: 0,
    totalApprenants: 0,
    totalFormations: 0
  };
  isLoading = true;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.userName = this.authService.getUserName() || 'Administrateur';
    this.userEmail = this.authService.getUserEmail() || '';
  }

  ngOnInit(): void {

  }


  getInitials(name: string): string {
    if (!name) return 'A';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
