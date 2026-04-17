import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin';
import { CommonModule } from '@angular/common';
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
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-admin',
  imports: [
    RouterLink,
    CommonModule,
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
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule

  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent implements OnInit {

  users: any[] = [];

  constructor(private admin: AdminService, private router : Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

   loadUsers() {

    let formateurs: any[] = [];
    let apprenants: any[] = [];

    this.admin.listerFormateurs().subscribe(f => {
      formateurs = f.map(x => ({
        ...x,
        createdAt: x.createdAt || new Date()
      }));

      this.admin.listerApprenants().subscribe(a => {
        apprenants = a.map(x => ({
          ...x,
          createdAt: x.createdAt || new Date()
        }));


        this.users = [...formateurs, ...apprenants].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

}
