import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboard {
  todayDate = new Date();

  formateurs = [
    { nom: 'Marie Martin', email: 'marie@email.com', specialite: 'Développement Web', date: '05/04/2024' },
    { nom: 'Thomas Durand', email: 'thomas@email.com', specialite: 'Data Science', date: '03/04/2024' },
    { nom: 'Sophie Bernard', email: 'sophie@email.com', specialite: 'UI/UX Design', date: '01/04/2024' }
  ];

  inscriptions = [
    { apprenant: 'Lucas Petit', formation: 'Angular Masterclass', date: '05/04/2024', statut: 'Confirmée' },
    { apprenant: 'Emma Dubois', formation: 'React.js Complet', date: '04/04/2024', statut: 'Confirmée' },
    { apprenant: 'Hugo Leroy', formation: 'Python Débutant', date: '03/04/2024', statut: 'En attente' }
  ];

  displayedColumnsFormateurs = ['nom', 'email', 'specialite', 'date'];
  displayedColumnsInscriptions = ['apprenant', 'formation', 'date', 'statut'];
}
