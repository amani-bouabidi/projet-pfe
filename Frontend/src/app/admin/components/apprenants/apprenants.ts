import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';  // ✅ Ajout pour mat-divider
import { AdminService } from '../../service/admin';

@Component({
  selector: 'app-apprenants',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDividerModule
  ],
  templateUrl:'./apprenants.html',
  styleUrls: ['./apprenants.scss']
})
export class AdminApprenantsComponent implements OnInit { 


  apprenants: any[] = [];
  filteredApprenants: any[] = [];
  searchTerm: string = '';

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private admin: AdminService
  ) {}

  ngOnInit() {
     this.loadApprenants();
  }

  //===================== Load ==========================

  loadApprenants() {
     this.admin.listerApprenants().subscribe(res => {
      this.apprenants = res.map(a => ({
        ...a,
        createdAt: a.createdAt ? a.createdAt : new Date()
      }));
      this.filteredApprenants = [...this.apprenants];
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();

    this.filteredApprenants = this.apprenants.filter(a =>
      a.nom.toLowerCase().includes(term) ||
      a.prenom.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term)
    );
  }

  deleteApprenant(id: number) {

    if (!confirm("Supprimer cet apprenant ?")) return;

    this.admin.supprimerApprenant(id).subscribe({
      next: () => {
        this.loadApprenants();
        alert("Supprimé");
      },
      error: () => alert("Erreur")
    });
  }







}
