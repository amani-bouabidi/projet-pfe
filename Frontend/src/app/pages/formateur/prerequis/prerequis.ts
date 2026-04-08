import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormateurService } from '../../../services/formateur';

@Component({
  selector: 'app-prerequis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prerequis.html',
  styleUrls: ['./prerequis.scss']
})
export class Prerequis implements OnInit {
  formations: any[] = [];
  selectedFormation: any = null;
  prerequis: string[] = [];
  newPrerequis = '';
  showAddForm = false;
  isLoading = true;

  constructor(private formateurService: FormateurService) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.isLoading = true;
    this.formateurService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading formations', err);
        this.isLoading = false;
      }
    });
  }

  onSelectFormation(formation: any): void {
    this.selectedFormation = formation;
    this.loadPrerequis(formation.id);
    this.showAddForm = false;
    this.newPrerequis = '';
  }

  loadPrerequis(formationId: number): void {
    this.formateurService.getPrerequis(formationId).subscribe({
      next: (data) => {
        this.prerequis = data;
      },
      error: (err) => console.error('Error loading prerequis', err)
    });
  }

  addPrerequis(): void {
    if (this.newPrerequis.trim() && this.selectedFormation) {
      this.formateurService.addPrerequis(this.selectedFormation.id, this.newPrerequis).subscribe({
        next: () => {
          this.prerequis.push(this.newPrerequis);
          this.newPrerequis = '';
          this.showAddForm = false;
        },
        error: (err) => console.error('Error adding prerequis', err)
      });
    }
  }

  deletePrerequis(prerequis: string): void {
    if (this.selectedFormation && confirm('Supprimer ce prérequis ?')) {
      this.formateurService.deletePrerequis(this.selectedFormation.id, prerequis).subscribe({
        next: () => {
          this.prerequis = this.prerequis.filter(p => p !== prerequis);
        },
        error: (err) => console.error('Error deleting prerequis', err)
      });
    }
  }
}
