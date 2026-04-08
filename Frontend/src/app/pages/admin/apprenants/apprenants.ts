import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin';

@Component({
  selector: 'app-apprenants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apprenants.html',
  styleUrls: ['./apprenants.scss']
})
export class Apprenants implements OnInit {
  apprenants: any[] = [];
  filteredApprenants: any[] = [];
  searchTerm = '';
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadApprenants();
  }

  loadApprenants(): void {
    this.isLoading = true;
    this.adminService.getApprenants().subscribe({
      next: (data) => {
        this.apprenants = data;
        this.filteredApprenants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading apprenants', err);
        this.isLoading = false;
      }
    });
  }

  filterApprenants(): void {
    if (!this.searchTerm) {
      this.filteredApprenants = this.apprenants;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredApprenants = this.apprenants.filter(a =>
        a.firstName.toLowerCase().includes(term) ||
        a.lastName.toLowerCase().includes(term) ||
        a.email.toLowerCase().includes(term)
      );
    }
  }

  deleteApprenant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet apprenant ?')) {
      this.adminService.deleteApprenant(id).subscribe({
        next: () => this.loadApprenants(),
        error: (err) => console.error('Error deleting apprenant', err)
      });
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  getActiveCount(): number {
    return this.apprenants.filter(a => a.isActive !== false).length;
  }
}
