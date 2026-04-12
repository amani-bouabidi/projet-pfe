import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './formations.html',
  styleUrls: ['./formations.scss']
})
export class FormationsComponent implements OnInit {
  formations: any[] = [];
  filteredFormations: any[] = [];
  formateurs: any[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';
  isLoading = true;
  editMode = false;
  selectedFormation: any = null;

  formationForm: FormGroup;

  @ViewChild('formModal') formModal: any;

  niveaux = [
    { value: 'DEBUTANT', label: 'Débutant' },
    { value: 'INTERMEDIAIRE', label: 'Intermédiaire' },
    { value: 'AVANCE', label: 'Avancé' }
  ];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formationForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      duree: ['', [Validators.required, Validators.min(1)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      formateurId: ['', Validators.required],
      categorie: [''],
      niveau: ['DEBUTANT'],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadFormations();
    this.loadFormateurs();
  }

  loadFormations(): void {
    this.isLoading = true;
    this.adminService.getFormations().subscribe({
      next: (data: any[]) => {
        this.formations = data;
        this.filteredFormations = data;
        this.extractCategories();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading formations', err);
        this.isLoading = false;
      }
    });
  }

  loadFormateurs(): void {
    this.adminService.getFormateurs().subscribe({
      next: (data: any[]) => {
        this.formateurs = data;
      },
      error: (err: any) => console.error('Error loading formateurs', err)
    });
  }

  extractCategories(): void {
    const cats = this.formations.map(f => f.categorie).filter(c => c);
    this.categories = [...new Set(cats)];
  }

  filterFormations(): void {
    let result = [...this.formations];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(f =>
        f.titre.toLowerCase().includes(term) ||
        f.description.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategory) {
      result = result.filter(f => f.categorie === this.selectedCategory);
    }

    this.filteredFormations = result;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.filteredFormations = [...this.formations];
  }

  openFormModal(): void {
    this.editMode = false;
    this.selectedFormation = null;
    this.formationForm.reset();
    this.formationForm.patchValue({ niveau: 'DEBUTANT' });
    this.dialog.open(this.formModal, { width: '600px' });
  }

  editFormation(formation: any): void {
    this.editMode = true;
    this.selectedFormation = formation;
    this.formationForm.patchValue({
      titre: formation.titre,
      description: formation.description,
      duree: formation.duree,
      dateDebut: formation.dateDebut,
      dateFin: formation.dateFin,
      formateurId: formation.formateurId,
      categorie: formation.categorie || '',
      niveau: formation.niveau || 'DEBUTANT',
      imageUrl: formation.imageUrl || ''
    });
    this.dialog.open(this.formModal, { width: '600px' });
  }

  saveFormation(): void {
    if (this.formationForm.invalid) return;

    if (this.editMode && this.selectedFormation) {
      this.adminService.updateFormation(this.selectedFormation.id, this.formationForm.value).subscribe({
        next: () => {
          this.loadFormations();
          this.dialog.closeAll();
        },
        error: (err: any) => console.error('Error updating formation', err)
      });
    } else {
      this.adminService.createFormation(this.formationForm.value).subscribe({
        next: () => {
          this.loadFormations();
          this.dialog.closeAll();
        },
        error: (err: any) => console.error('Error creating formation', err)
      });
    }
  }

  deleteFormation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.adminService.deleteFormation(id).subscribe({
        next: () => this.loadFormations(),
        error: (err: any) => console.error('Error deleting formation', err)
      });
    }
  }

  getFormateurName(formateurId: number): string {
    const formateur = this.formateurs.find(f => f.id === formateurId);
    return formateur ? `${formateur.firstName} ${formateur.lastName}` : 'Non assigné';
  }

  isActive(formation: any): boolean {
    const today = new Date();
    const debut = new Date(formation.dateDebut);
    const fin = new Date(formation.dateFin);
    return today >= debut && today <= fin;
  }
}
