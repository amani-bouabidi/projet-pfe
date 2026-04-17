import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface Formation {
  id: number;
  titre: string;
  description: string;
  formateurNom: string;
  domaineId: number;
  domaineNom: string;
  duree: string;
  niveau: string;
}

@Component({
  selector: 'app-formations-by-domaine',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './formations-by-domaine.html',
  styleUrls: ['./formations-by-domaine.scss']
})
export class FormationsByDomaineComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  domaineId: number | null = null;
  domaineNom: string = '';
  searchTerm: string = '';

  private allFormations: Formation[] = [
    { id: 1, titre: 'Agriculture Durable', description: 'Techniques d\'agriculture durable', formateurNom: 'Dr. Jean Dupont', domaineId: 1, domaineNom: 'Agriculture', duree: '6 mois', niveau: 'Intermédiaire' },
    { id: 2, titre: 'Agroécologie', description: 'Étude des écosystèmes agricoles', formateurNom: 'Prof. Marie Martin', domaineId: 1, domaineNom: 'Agriculture', duree: '4 mois', niveau: 'Débutant' },
    { id: 3, titre: 'IA Moderne', description: 'Intelligence artificielle', formateurNom: 'Dr. Lucas Petit', domaineId: 3, domaineNom: 'Informatique', duree: '10 mois', niveau: 'Avancé' },
    { id: 4, titre: 'Web Development', description: 'Développement web full stack', formateurNom: 'M. Pierre Robert', domaineId: 3, domaineNom: 'Informatique', duree: '12 mois', niveau: 'Débutant' },
    { id: 5, titre: 'Biologie', description: 'Biologie moléculaire', formateurNom: 'Dr. Sophie Bernard', domaineId: 2, domaineNom: 'Biologie', duree: '8 mois', niveau: 'Avancé' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.domaineId = +params['id'];
      this.loadFormations();
    });
  }

  loadFormations(): void {
    this.formations = this.allFormations.filter(f => f.domaineId === this.domaineId);
    this.filteredFormations = [...this.formations];

    if (this.formations.length > 0) {
      this.domaineNom = this.formations[0].domaineNom;
    }
  }

  goToFormationDetail(formationId: number): void {
    this.router.navigate(['/domaines', this.domaineId, 'formations', formationId]);
  }

  goBack(): void {
    this.router.navigate(['/domaines']);
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredFormations = this.formations;
    } else {
      this.filteredFormations = this.formations.filter(f =>
        f.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
