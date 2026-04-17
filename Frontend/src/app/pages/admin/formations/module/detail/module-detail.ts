// src/app/pages/admin/formations/module/detail/module-detail.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../../../../admin/service/admin';

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./module-detail.html',
  styleUrls: ['./module-detail.scss']
})
export class ModuleDetailComponent {

  module: any = null;
  documents: any[] = [];
  videos: any[] = [];
  loading = true;
  moduleId: number = 0;

  // Pour l'upload
  selectedDocumentFile: File | null = null;
  selectedVideoFile: File | null = null;
  uploadingDoc = false;
  uploadingVideo = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.moduleId = Number(this.route.snapshot.paramMap.get('moduleId'));
    if (this.moduleId) {
      //this.loadModuleContent();
    }
  }

  /*loadModuleContent(): void {
    this.loading = true;
    this.adminService.getModuleContent(this.moduleId).subscribe({
      next: (data) => {
        this.module = data;
        this.documents = data.documents || [];
        this.videos = data.videos || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement module', err);
        this.loading = false;
      }
    });
  }

  // Upload Document
  onDocumentSelected(event: any): void {
    this.selectedDocumentFile = event.target.files[0];
    if (this.selectedDocumentFile) {
      this.uploadingDoc = true;
      this.adminService.uploadDocument(this.moduleId, this.selectedDocumentFile).subscribe({
        next: () => {
          this.loadModuleContent();
          this.selectedDocumentFile = null;
          this.uploadingDoc = false;
          alert('Document uploadé avec succès');
        },
        error: (err) => {
          console.error(err);
          this.uploadingDoc = false;
          alert('Erreur lors de l\'upload du document');
        }
      });
    }
  }

  // Upload Vidéo
  onVideoSelected(event: any): void {
    this.selectedVideoFile = event.target.files[0];
    if (this.selectedVideoFile) {
      this.uploadingVideo = true;
      this.adminService.uploadVideo(this.moduleId, this.selectedVideoFile).subscribe({
        next: () => {
          this.loadModuleContent();
          this.selectedVideoFile = null;
          this.uploadingVideo = false;
          alert('Vidéo uploadée avec succès');
        },
        error: (err) => {
          console.error(err);
          this.uploadingVideo = false;
          alert('Erreur lors de l\'upload de la vidéo');
        }
      });
    }
  }*/
}
