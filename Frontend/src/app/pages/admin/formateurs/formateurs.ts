import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-formateurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './formateurs.html',
  styleUrls: ['./formateurs.scss']
})
export class FormateursComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'email', 'phone', 'specialite', 'statut', 'date', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchTerm = '';
  isLoading = true;
  editMode = false;
  selectedFormateur: any = null;

  formateurForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('formModal') formModal: any;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formateurForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      specialite: ['', Validators.required],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadFormateurs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFormateurs(): void {
    this.isLoading = true;
    this.adminService.getFormateurs().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading formateurs', err);
        this.isLoading = false;
      }
    });
  }

  filterFormateurs(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openFormModal(): void {
    this.editMode = false;
    this.selectedFormateur = null;
    this.formateurForm.reset();
    this.dialog.open(this.formModal, { width: '500px' });
  }

  editFormateur(formateur: any): void {
    this.editMode = true;
    this.selectedFormateur = formateur;
    this.formateurForm.patchValue({
      firstName: formateur.firstName,
      lastName: formateur.lastName,
      email: formateur.email,
      phone: formateur.phone || '',
      specialite: formateur.specialite,
      password: ''
    });
    this.dialog.open(this.formModal, { width: '500px' });
  }

  saveFormateur(): void {
    if (this.formateurForm.invalid) return;

    if (this.editMode && this.selectedFormateur) {
      const updateData = { ...this.formateurForm.value };
      if (!updateData.password) delete updateData.password;

      this.adminService.updateFormateur(this.selectedFormateur.id, updateData).subscribe({
        next: () => {
          this.loadFormateurs();
          this.dialog.closeAll();
        },
        error: (err) => console.error('Error updating formateur', err)
      });
    } else {
      this.adminService.createFormateur(this.formateurForm.value).subscribe({
        next: () => {
          this.loadFormateurs();
          this.dialog.closeAll();
        },
        error: (err) => console.error('Error creating formateur', err)
      });
    }
  }

  deleteFormateur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
      this.adminService.deleteFormateur(id).subscribe({
        next: () => this.loadFormateurs(),
        error: (err) => console.error('Error deleting formateur', err)
      });
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
}
