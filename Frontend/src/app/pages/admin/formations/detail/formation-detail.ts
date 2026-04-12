// src/app/pages/admin/formations/detail/formation-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../../../services/admin';

@Component({
  selector: 'app-formation-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formation-detail.html',
  styleUrls: ['./formation-detail.scss']
})
export class FormationDetailComponent implements OnInit {

  formation: any = null;
  modules: any[] = [];
  loading = true;
  formationId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.formationId = Number(this.route.snapshot.paramMap.get('formationId'));
    if (this.formationId) {
      this.loadFormationDetail();
    }
  }

  loadFormationDetail(): void {
    this.loading = true;

    this.adminService.getFormationWithModules(this.formationId).subscribe({
      next: (data) => {
        this.formation = data;
        this.modules = data.modules || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement détail formation', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(statut: string): string {
    switch (statut?.toUpperCase()) {
      case 'EN_COURS': return 'status ongoing';
      case 'PLANIFIE': return 'status planned';
      case 'TERMINEE': return 'status completed';
      default: return 'status planned';
    }
  }
}
