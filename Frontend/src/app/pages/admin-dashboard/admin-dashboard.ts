import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService, UtilisateurResponseDTO } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <div class="dashboard-header">
        <h1>Tableau de bord Administrateur</h1>
        <p>Gérez les formateurs, apprenants et formations</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👨‍🏫</div>
          <div class="stat-info">
            <h3>Formateurs</h3>
            <p class="stat-number">{{ formateursCount }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👨‍🎓</div>
          <div class="stat-info">
            <h3>Apprenants</h3>
            <p class="stat-number">{{ apprenantsCount }}</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <h3>Formations</h3>
            <p class="stat-number">{{ formationsCount }}</p>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Actions rapides</h2>
        <div class="actions-grid">
          <a routerLink="/admin/formateurs" class="action-card">
            <div class="action-icon">👨‍🏫</div>
            <h3>Gérer les formateurs</h3>
            <p>Ajouter, modifier ou supprimer des formateurs</p>
          </a>
          <a routerLink="/admin/apprenants" class="action-card">
            <div class="action-icon">👨‍🎓</div>
            <h3>Gérer les apprenants</h3>
            <p>Consulter et gérer les apprenants</p>
          </a>
          <a routerLink="/admin/formations" class="action-card">
            <div class="action-icon">📚</div>
            <h3>Gérer les formations</h3>
            <p>Créer et organiser les formations</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 2rem;
      background: #f5f7fa;
      min-height: 100vh;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      color: #333;
      font-size: 28px;
      margin-bottom: 0.5rem;
    }

    .dashboard-header p {
      color: #666;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      font-size: 3rem;
    }

    .stat-info h3 {
      color: #666;
      font-size: 14px;
      margin-bottom: 0.5rem;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
      margin: 0;
    }

    .quick-actions h2 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      text-align: center;
      transition: all 0.3s;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    }

    .action-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .action-card h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .action-card p {
      color: #666;
      font-size: 14px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  formateursCount = 0;
  apprenantsCount = 0;
  formationsCount = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadCounts();
  }

  private loadCounts() {
    this.adminService.listerFormateurs().subscribe({
      next: (data) => this.formateursCount = data.length,
      error: (err) => console.error('Error loading formateurs:', err)
    });

    this.adminService.listerApprenants().subscribe({
      next: (data) => this.apprenantsCount = data.length,
      error: (err) => console.error('Error loading apprenants:', err)
    });

    // Load formations count from formations service
    this.formationsCount = 12; // Temporary - replace with actual service call
  }
}
