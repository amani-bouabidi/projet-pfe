import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormationStepperService, Formation, Module } from '../../services/formation';

@Component({
  selector: 'app-formation-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './formation-stepper.html',
  styleUrls: ['./formation-stepper.scss']
})
export class FormationStepperComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  formationForm!: FormGroup;
  modulesForm!: FormGroup;
  currentFormationId: number | null = null;
  formateurs: any[] = [];
  domaines: any[] = [];
  isLoading = false;
  progress = 0;
  isCompleted = false;

  constructor(
    private fb: FormBuilder,
    private service: FormationStepperService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadSelectData();
  }

  initForms(): void {
    // Step 1: Formation Form
    this.formationForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      formateurId: ['', Validators.required],
      domaineId: ['', Validators.required]
    });

    // Step 2: Modules Form with FormArray
    this.modulesForm = this.fb.group({
      modules: this.fb.array([])
    });

    // Add initial empty module
    this.addModule();
  }

  get modulesArray(): FormArray {
    return this.modulesForm.get('modules') as FormArray;
  }

  createModuleForm(): FormGroup {
    return this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  addModule(): void {
    this.modulesArray.push(this.createModuleForm());
  }

  removeModule(index: number): void {
    if (this.modulesArray.length > 1) {
      this.modulesArray.removeAt(index);
    }
  }

  loadSelectData(): void {
    this.service.getFormateurs().subscribe(data => {
      this.formateurs = data;
    });
    this.service.getDomaines().subscribe(data => {
      this.domaines = data;
    });
  }

  // Step 1: Create Formation
  createFormation(): void {
    if (this.formationForm.invalid) {
      this.formationForm.markAllAsTouched();
      this.showMessage('Veuillez remplir tous les champs', 'error');
      return;
    }

    this.isLoading = true;
    this.progress = 25;

    const formationData = {
      titre: this.formationForm.value.titre,
      description: this.formationForm.value.description,
      formateurId: this.formationForm.value.formateurId,
      domaineId: this.formationForm.value.domaineId
    };

    this.service.createFormation(formationData).subscribe({
      next: (formation) => {
        this.currentFormationId = formation.id;
        this.showMessage('Formation créée avec succès', 'success');
        this.isLoading = false;
        this.progress = 50;
        this.stepper.next();
      },
      error: (error) => {
        console.error('Error creating formation:', error);
        this.showMessage('Erreur lors de la création', 'error');
        this.isLoading = false;
      }
    });
  }

  // Step 2: Create Modules - FIXED VERSION
  createModules(): void {
    if (this.modulesArray.invalid) {
      this.modulesArray.markAllAsTouched();
      this.showMessage('Veuillez remplir tous les modules', 'error');
      return;
    }

    // Check if formationId exists
    if (!this.currentFormationId) {
      this.showMessage('Erreur: ID de formation manquant', 'error');
      return;
    }

    this.isLoading = true;
    this.progress = 60;

    const modulePromises = this.modulesArray.controls.map((control) => {
      const moduleData = {
        titre: control.get('titre')?.value,
        description: control.get('description')?.value,
        formationId: this.currentFormationId as number  // Use non-null assertion
      };
      return this.service.createModule(moduleData).toPromise();
    });

    Promise.all(modulePromises).then((modules) => {
      // Store created modules for step 3
      (window as any).createdModules = modules;
      this.showMessage(`${modules.length} module(s) créé(s)`, 'success');
      this.isLoading = false;
      this.progress = 75;
      this.stepper.next();
    }).catch(error => {
      console.error('Error creating modules:', error);
      this.showMessage('Erreur lors de la création des modules', 'error');
      this.isLoading = false;
    });
  }

  // Step 3: Add content to modules
  addDocumentToModule(moduleId: number, moduleIndex: number): void {
    const docNom = (document.getElementById(`doc_nom_${moduleIndex}`) as HTMLInputElement)?.value;
    const docPath = (document.getElementById(`doc_path_${moduleIndex}`) as HTMLInputElement)?.value;

    if (!docNom || !docPath) {
      this.showMessage('Veuillez remplir nom et chemin du document', 'error');
      return;
    }

    this.service.createDocument({
      nom: docNom,
      filePath: docPath,
      moduleId: moduleId
    }).subscribe({
      next: (doc) => {
        this.showMessage('Document ajouté', 'success');
        // Clear inputs
        (document.getElementById(`doc_nom_${moduleIndex}`) as HTMLInputElement).value = '';
        (document.getElementById(`doc_path_${moduleIndex}`) as HTMLInputElement).value = '';
        // Refresh display
        this.refreshModuleContent(moduleIndex);
      },
      error: (error) => {
        console.error('Error adding document:', error);
        this.showMessage('Erreur', 'error');
      }
    });
  }

  addVideoToModule(moduleId: number, moduleIndex: number): void {
    const videoTitre = (document.getElementById(`video_titre_${moduleIndex}`) as HTMLInputElement)?.value;
    const videoPath = (document.getElementById(`video_path_${moduleIndex}`) as HTMLInputElement)?.value;

    if (!videoTitre || !videoPath) {
      this.showMessage('Veuillez remplir titre et chemin de la vidéo', 'error');
      return;
    }

    this.service.createVideo({
      titre: videoTitre,
      filePath: videoPath,
      moduleId: moduleId
    }).subscribe({
      next: (video) => {
        this.showMessage('Vidéo ajoutée', 'success');
        // Clear inputs
        (document.getElementById(`video_titre_${moduleIndex}`) as HTMLInputElement).value = '';
        (document.getElementById(`video_path_${moduleIndex}`) as HTMLInputElement).value = '';
        // Refresh display
        this.refreshModuleContent(moduleIndex);
      },
      error: (error) => {
        console.error('Error adding video:', error);
        this.showMessage('Erreur', 'error');
      }
    });
  }

  refreshModuleContent(moduleIndex: number): void {
    // This would fetch updated content from backend
    // For demo, we just show a success message
  }

  completeStepper(): void {
    this.progress = 100;
    this.isCompleted = true;
    this.showMessage('✅ Formation complétée avec succès!', 'success');

    setTimeout(() => {
      this.resetStepper();
    }, 3000);
  }

  resetStepper(): void {
    this.formationForm.reset();
    this.modulesArray.clear();
    this.addModule();
    this.currentFormationId = null;
    this.progress = 0;
    this.isCompleted = false;
    this.stepper.reset();
    this.showMessage('Formulaire réinitialisé', 'info');
  }

  showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : type === 'error' ? 'snackbar-error' : 'snackbar-info'
    });
  }

  getErrorMessage(control: any, fieldName: string): string {
    if (control?.hasError('required')) {
      return `${fieldName} est requis`;
    }
    if (control?.hasError('minlength')) {
      return `Minimum ${control.errors?.['minlength']?.requiredLength} caractères`;
    }
    return '';
  }
}
