import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Formation {
  id: number;
  titre: string;
  description: string;
  formateurId: number;
  domaineId: number;
}

export interface Module {
  id: number;
  titre: string;
  description: string;
  formationId: number;
}

export interface Document {
  id: number;
  nom: string;
  filePath: string;
  moduleId: number;
}

export interface Video {
  id: number;
  titre: string;
  filePath: string;
  moduleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormationStepperService {
  private apiUrl = '/api';

  // Mock data
  private formateurs = [
    { id: 1, nom: 'Dupont', prenom: 'Jean' },
    { id: 2, nom: 'Martin', prenom: 'Marie' },
    { id: 3, nom: 'Bernard', prenom: 'Sophie' },
    { id: 4, nom: 'Petit', prenom: 'Lucas' }
  ];

  private domaines = [
    { id: 1, nom: 'Agriculture' },
    { id: 2, nom: 'Biologie' },
    { id: 3, nom: 'Informatique' },
    { id: 4, nom: 'Chimie' },
    { id: 5, nom: 'Physique' }
  ];

  private formations: Formation[] = [];
  private modules: Module[] = [];
  private documents: Document[] = [];
  private videos: Video[] = [];

  getFormateurs(): Observable<any[]> {
    return of(this.formateurs).pipe(delay(300));
  }

  getDomaines(): Observable<any[]> {
    return of(this.domaines).pipe(delay(300));
  }

  createFormation(formation: Omit<Formation, 'id'>): Observable<Formation> {
    const newId = this.formations.length + 1;
    const newFormation = { ...formation, id: newId };
    this.formations.push(newFormation);
    return of(newFormation).pipe(delay(500));
  }

  createModule(module: Omit<Module, 'id'>): Observable<Module> {
    const newId = this.modules.length + 1;
    const newModule = { ...module, id: newId };
    this.modules.push(newModule);
    return of(newModule).pipe(delay(300));
  }

  createDocument(document: Omit<Document, 'id'>): Observable<Document> {
    const newId = this.documents.length + 1;
    const newDocument = { ...document, id: newId };
    this.documents.push(newDocument);
    return of(newDocument).pipe(delay(200));
  }

  createVideo(video: Omit<Video, 'id'>): Observable<Video> {
    const newId = this.videos.length + 1;
    const newVideo = { ...video, id: newId };
    this.videos.push(newVideo);
    return of(newVideo).pipe(delay(200));
  }
}
