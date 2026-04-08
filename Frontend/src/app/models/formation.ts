export interface Formation {
  id: number;
  titre: string;
  description: string;
  duree: number;
  prix: number;
  dateDebut: string;
  dateFin: string;
  formateurId: number;
  formateurName?: string;
  categorie?: string;
  niveau?: 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE';
  imageUrl?: string;
  inscriptionsCount?: number;
  modulesCount?: number;
  prerequisCount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Module {
  id: number;
  titre: string;
  description: string;
  duree: number;
  ordre: number;
  formationId: number;
  formationTitre?: string;
  estComplete?: boolean;
  ressources?: Ressource[];
}

export interface Ressource {
  id: number;
  nom: string;
  type: string;
  url: string;
  taille: number;
  moduleId: number;
}

export interface Prerequis {
  id: number;
  nom: string;
  formationId: number;
  createdAt: Date;
}
