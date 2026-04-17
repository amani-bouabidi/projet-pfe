import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AdminService } from '../../service/admin';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './formations.html',
  styleUrls: ['./formations.scss']
})
export class AdminFormationsComponent implements OnInit {
  domaines: any[] = [];
  formateurs: any[] = [];
  formations: any[] = [];
  modules: any[] = [];

  selectedDomaineId!: number;
  selectedFormationId!: number;
  selectedFormation: any = null;

  formation = {
    titre: '',
    description: '',
    formateurId: null as number | null,
    domaineId: null as number | null
  };

  module = {
    titre: '',
    description: '',
  };

  selectedDoc!: File;
  selectedVideo!: File;
  selectedDocName: string = '';
  selectedVideoName: string = '';

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.admin.getDomaines().subscribe({
      next: (res) => this.domaines = res,
      error: (err) => console.error('Error loading domaines:', err)
    });

    this.admin.getFormateurs().subscribe({
      next: (res) => this.formateurs = res,
      error: (err) => console.error('Error loading formateurs:', err)
    });
  }

  onDomaineChange(id: number) {
    this.selectedDomaineId = id;

    if (id) {
      this.admin.getFormationsByDomaine(String(id)).subscribe({
        next: (res) => this.formations = res,
        error: (err) => console.error('Error loading formations:', err)
      });
    } else {
      this.formations = [];
    }

    this.modules = [];
    this.selectedFormation = null;
  }

  onFormationChange(id: number) {
    this.selectedFormationId = id;

    if (id) {
      this.selectedFormation = this.formations.find(f => f.id === id);

      this.admin.getModules().subscribe({
        next: (res) => {
          this.modules = res.filter(m => m.formationId === id);
        },
        error: (err) => console.error('Error loading modules:', err)
      });
    } else {
      this.modules = [];
      this.selectedFormation = null;
    }
  }

  createFormation() {
    if (!this.formation.formateurId || !this.formation.domaineId) {
      alert('Veuillez sélectionner un formateur et un domaine');
      return;
    }

    if (!this.formation.titre || !this.formation.description) {
      alert('Veuillez remplir le titre et la description');
      return;
    }

    this.admin.createFormation(this.formation).subscribe({
      next: () => {
        alert('Formation ajoutée ✅');
        this.formation = {
          titre: '',
          description: '',
          formateurId: null,
          domaineId: null
        };

        if (this.selectedDomaineId) {
          this.onDomaineChange(this.selectedDomaineId);
        }
      },
      error: (err) => {
        console.error('Error creating formation:', err);
        alert('Erreur lors de la création de la formation');
      }
    });
  }

  createModule() {
    if (!this.selectedFormationId) {
      alert('Veuillez sélectionner une formation');
      return;
    }

    if (!this.module.titre || !this.module.description) {
      alert('Veuillez remplir tous les champs du module');
      return;
    }

    const data = {
      ...this.module,
      formationId: this.selectedFormationId
    };

    this.admin.createModule(data).subscribe({
      next: () => {
        this.onFormationChange(this.selectedFormationId);
        this.module = {
          titre: '',
          description: '',
        };
        alert('Module ajouté ✅');
      },
      error: (err) => {
        console.error('Error creating module:', err);
        alert('Erreur lors de la création du module');
      }
    });
  }

  deleteModule(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce module ?')) {
      this.admin.deleteModule(id).subscribe({
        next: () => {
          this.onFormationChange(this.selectedFormationId);
          alert('Module supprimé ✅');
        },
        error: (err) => {
          console.error('Error deleting module:', err);
          alert('Erreur lors de la suppression du module');
        }
      });
    }
  }

  onDocSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedDoc = event.target.files[0];
      this.selectedDocName = this.selectedDoc.name;
    }
  }

  uploadDoc(moduleId: number) {
    if (!this.selectedDoc) {
      alert('Veuillez sélectionner un document');
      return;
    }

    this.admin.uploadDocument(moduleId, this.selectedDoc).subscribe({
      next: () => {
        alert('Document ajouté ✅');
        this.selectedDoc = null as any;
        this.selectedDocName = '';
        // Clear file input
        const fileInput = document.querySelector('#docInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        console.error('Error uploading document:', err);
        alert('Erreur lors de l\'upload du document');
      }
    });
  }

  onVideoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedVideo = event.target.files[0];
      this.selectedVideoName = this.selectedVideo.name;
    }
  }

  uploadVideo(moduleId: number) {
    if (!this.selectedVideo) {
      alert('Veuillez sélectionner une vidéo');
      return;
    }

    this.admin.uploadVideo(moduleId, this.selectedVideo).subscribe({
      next: () => {
        alert('Vidéo ajoutée ✅');
        this.selectedVideo = null as any;
        this.selectedVideoName = '';
        // Clear file input
        const fileInput = document.querySelector('#videoInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        console.error('Error uploading video:', err);
        alert('Erreur lors de l\'upload de la vidéo');
      }
    });
  }

  finalize() {
    alert('Configuration terminée avec succès ! 🎉');
  }
}
