import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin';

export interface Formateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  roleNom: string;
  actif: boolean;
  createdAt: Date;  // This field is now included
}

@Component({
  selector: 'app-formateur',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './formateurs.html',
  styleUrls: ['./formateurs.scss']
})
export class AdminFormateursComponent implements OnInit {
  formateurForm!: FormGroup;

  formateurs: any[] = [];
  filteredFormateurs: any[] = [];

  isEditing = false;
  editingId: number | null = null;

  searchTerm: string = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private admin: AdminService
  ) {}

  ngOnInit(): void {
      this.formateurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
    });

    this.loadFormateurs();
  }

  //====================== Load =============================

  loadFormateurs() {
    this.admin.listerFormateurs().subscribe(res => {
      this.formateurs = res.map(f => ({
        ...f,
        createdAt: f.createdAt ? f.createdAt : new Date()
      }));
      this.filteredFormateurs = [...this.formateurs];
    })
  }

  //====================== Search ===========================


  onSearch() {
    const term = this.searchTerm.toLowerCase();

    this.filteredFormateurs = this.formateurs.filter(f =>
      f.nom.toLowerCase().includes(term) ||
      f.prenom.toLowerCase().includes(term) ||
      f.email.toLowerCase().includes(term)
    );
  }

  //==================== Submit ===============================

  onSubmit(): void {
    if (this.formateurForm.invalid) return;

    if (this.isEditing) {
      this.updateFormateur();
    } else {
      this.creerFormateur();
    }
  }

  //================= Create ====================================

  creerFormateur() {
    const data = this.formateurForm.value;

    if (!data.password) {
      alert('Le mot de passe est requis');
      return;
    }

    this.admin.creerFormateur(data).subscribe({
      next: () => {
        this.loadFormateurs();
        this.resetForm();
        alert("Ajout réussi");
      },

      error: () => alert("Erreur")
    });

  }

  //==================== Update ===================================

  updateFormateur() {
    if (!this.editingId) return;

    const data = this.formateurForm.value();

    this.admin.modifierFormateur(this.editingId, data).subscribe({
      next: () => {
        this.loadFormateurs();
        this.resetForm();
        alert("Modification réussi");
      },

      error: () => alert("Erreur")
    });
  }

  //================== Delete =====================================

   deleteFormateur(id: number): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?');

    if (!confirmation) return;

    this.admin.supprimerFormateur(id).subscribe({
      next: () => {
        this.loadFormateurs();
        alert("Supprimer");
      },

      error: () => alert("Erreur")
    });
  }

  // ==================== Edit =====================================

  editFormateur(f: any): void {
    this.isEditing = true;
    this.editingId = f.id;
    this.formateurForm.patchValue({
      nom: f.nom,
      prenom: f.prenom,
      email: f.email,
      password: ''
    });
  }

  //================== Reset ========================================

  resetForm() {
    this.isEditing = false;
    this.editingId = null;
    this.formateurForm.reset()
  }

}
