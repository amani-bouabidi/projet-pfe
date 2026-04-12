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
import { AdminService } from '../../../services/admin';

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
    MatDividerModule  // ✅ Ajout pour mat-divider
  ],
  templateUrl: './apprenants.html',
  styleUrls: ['./apprenants.scss']
})
export class ApprenantsComponent implements OnInit {  // ✅ Nom du composant
  displayedColumns: string[] = ['id', 'nom', 'phone', 'dateInscription', 'formations', 'progression', 'statut', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchTerm = '';
  statusFilter = 'all';
  isLoading = true;
  totalApprenants = 0;
  activeCount = 0;
  inscriptionsMois = 0;
  selectedApprenant: any = null;
  apprenantToDelete: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('detailsModal') detailsModal: any;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

  }







}
