// src/app/pages/admin/formations/formations.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../admin/service/admin';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formations.html',
  styleUrls: ['./formations.scss']
})
export class FormationsComponent implements OnInit {

  formations: any[] = [];
  loading = true;
  errorMessage = '';

  // Formulaire pour créer / modifier
  formationForm: any = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    capacite: null,
    formateurId: null,
    domaineId: null,
    statut: 'PLANIFIE'
  };

  isModalOpen = false;
  isEditMode = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {

  }

  // ==================== Modal ====================
  openCreateModal(): void {
    this.isEditMode = false;
    this.formationForm = {
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      capacite: null,
      formateurId: null,
      domaineId: null,
      statut: 'PLANIFIE'
    };
    this.isModalOpen = true;
  }

  openEditModal(formation: any): void {
    this.isEditMode = true;
    this.formationForm = { ...formation };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
/*
  // ==================== CRUD ====================
  saveFormation(): void {
    if (this.isEditMode && this.formationForm.id) {
      // Modification
      this.adminService.updateFormation(this.formationForm.id, this.formationForm).subscribe({
        next: () => {
          this.loadFormations();
          this.closeModal();
          alert('Formation modifiée avec succès !');
        },
        error: (err) => alert('Erreur lors de la modification de la formation')
      });
    } else {
      // Création
      this.adminService.createFormation(this.formationForm).subscribe({
        next: () => {
          this.loadFormations();
          this.closeModal();
          alert('Formation créée avec succès !');
        },
        error: (err) => alert('Erreur lors de la création de la formation')
      });
    }
  }

  deleteFormation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.adminService.deleteFormation(id).subscribe({
        next: () => {
          this.loadFormations();
          alert('Formation supprimée avec succès');
        },
        error: (err) => alert('Erreur lors de la suppression')
      });
    }
  } */
}
