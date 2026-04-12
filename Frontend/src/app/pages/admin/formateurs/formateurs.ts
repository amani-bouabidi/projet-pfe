import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService, UtilisateurResponseDTO, UtilisateurCreationDTO } from '../../../services/admin';

@Component({
  selector: 'app-admin-formateurs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="formateurs-container">
      <div class="page-header">
        <h1>Gestion des Formateurs</h1>
        <button class="btn-add" (click)="openCreateModal()">+ Nouveau Formateur</button>
      </div>

      <!-- Create/Edit Modal -->
      <div class="modal" [class.show]="showModal" (click)="closeModalOnBackdrop($event)">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ editingFormateur ? 'Modifier Formateur' : 'Ajouter Formateur' }}</h2>
            <span class="close" (click)="closeModal()">&times;</span>
          </div>
          <div class="modal-body">
            <form [formGroup]="formateurForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label>Nom *</label>
                <input type="text" formControlName="nom" placeholder="Nom du formateur">
                <div class="error" *ngIf="formateurForm.get('nom')?.invalid && formateurForm.get('nom')?.touched">
                  Nom requis
                </div>
              </div>

              <div class="form-group">
                <label>Prénom *</label>
                <input type="text" formControlName="prenom" placeholder="Prénom du formateur">
                <div class="error" *ngIf="formateurForm.get('prenom')?.invalid && formateurForm.get('prenom')?.touched">
                  Prénom requis
                </div>
              </div>

              <div class="form-group">
                <label>Email *</label>
                <input type="email" formControlName="email" placeholder="email@exemple.com">
                <div class="error" *ngIf="formateurForm.get('email')?.invalid && formateurForm.get('email')?.touched">
                  Email valide requis
                </div>
              </div>

              <div class="form-group" *ngIf="!editingFormateur">
                <label>Mot de passe *</label>
                <input type="password" formControlName="password" placeholder="Minimum 8 caractères">
                <div class="error" *ngIf="formateurForm.get('password')?.invalid && formateurForm.get('password')?.touched">
                  Mot de passe requis (min 8 caractères)
                </div>
              </div>

              <div class="form-group" *ngIf="editingFormateur">
                <label>Nouveau mot de passe (optionnel)</label>
                <input type="password" formControlName="password" placeholder="Laisser vide pour ne pas changer">
              </div>

              <div class="form-actions">
                <button type="button" class="btn-cancel" (click)="closeModal()">Annuler</button>
                <button type="submit" class="btn-submit" [disabled]="formateurForm.invalid">
                  {{ editingFormateur ? 'Mettre à jour' : 'Créer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Formateurs List -->
      <div class="formateurs-list">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Date création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let formateur of formateurs">
                <td>{{ formateur.id }}</td>
                <td>{{ formateur.nom }}</td>
                <td>{{ formateur.prenom }}</td>
                <td>{{ formateur.email }}</td>
                <td>
                  <span class="badge" [class.active]="formateur.actif">
                    {{ formateur.actif ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td>{{ formateur.createdAt | date:'dd/MM/yyyy' }}</td>
                <td class="actions">
                  <button class="btn-edit" (click)="editFormateur(formateur)">✏️</button>
                  <button class="btn-delete" (click)="deleteFormateur(formateur.id)">🗑️</button>
                </td>
              </tr>
              <tr *ngIf="formateurs.length === 0">
                <td colspan="7" class="no-data">Aucun formateur trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .formateurs-container {
      padding: 2rem;
      background: #f5f7fa;
      min-height: 100vh;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      color: #333;
      font-size: 28px;
    }

    .btn-add {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.3s;
    }

    .btn-add:hover {
      transform: translateY(-2px);
    }

    .table-container {
      background: white;
      border-radius: 12px;
      overflow-x: auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    th {
      background: #f8f9fa;
      color: #555;
      font-weight: 600;
    }

    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      background: #dc3545;
      color: white;
    }

    .badge.active {
      background: #28a745;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-edit, .btn-delete {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.3s;
    }

    .btn-edit:hover {
      background: #e3f2fd;
    }

    .btn-delete:hover {
      background: #ffebee;
    }

    .no-data {
      text-align: center;
      color: #999;
      padding: 2rem;
    }

    /* Modal Styles */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
    }

    .modal.show {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      color: #333;
    }

    .close {
      font-size: 28px;
      cursor: pointer;
      color: #999;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    .error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }

    .btn-cancel {
      padding: 8px 16px;
      background: #f0f0f0;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-submit {
      padding: 8px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class AdminFormateursComponent implements OnInit {
  formateurs: UtilisateurResponseDTO[] = [];
  showModal = false;
  editingFormateur: UtilisateurResponseDTO | null = null;
  formateurForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.formateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.editingFormateur ? [] : [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.loadFormateurs();
  }

  loadFormateurs() {
    this.adminService.listerFormateurs().subscribe({
      next: (data) => this.formateurs = data,
      error: (err) => console.error('Error loading formateurs:', err)
    });
  }

  openCreateModal() {
    this.editingFormateur = null;
    this.formateurForm.reset();
    this.formateurForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    this.formateurForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  editFormateur(formateur: UtilisateurResponseDTO) {
    this.editingFormateur = formateur;
    this.formateurForm.patchValue({
      nom: formateur.nom,
      prenom: formateur.prenom,
      email: formateur.email,
      password: ''
    });
    this.formateurForm.get('password')?.clearValidators();
    this.formateurForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingFormateur = null;
    this.formateurForm.reset();
  }

  closeModalOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  onSubmit() {
    if (this.formateurForm.invalid) return;

    const data = this.formateurForm.value;
    data.roleNom = 'FORMATEUR';

    if (this.editingFormateur) {
      this.adminService.modifierFormateur(this.editingFormateur.id, data).subscribe({
        next: () => {
          this.loadFormateurs();
          this.closeModal();
        },
        error: (err) => console.error('Error updating formateur:', err)
      });
    } else {
      this.adminService.creerFormateur(data).subscribe({
        next: () => {
          this.loadFormateurs();
          this.closeModal();
        },
        error: (err) => console.error('Error creating formateur:', err)
      });
    }
  }

  deleteFormateur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
      this.adminService.supprimerFormateur(id).subscribe({
        next: () => this.loadFormateurs(),
        error: (err) => console.error('Error deleting formateur:', err)
      });
    }
  }
}
