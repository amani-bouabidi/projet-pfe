import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-prerequis-qcm',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  templateUrl: './prerequis-qcm.html',
  styleUrls: ['./prerequis-qcm.scss']
})
export class PrerequisQcmComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  formationId: number | null = null;
  testForm!: FormGroup;
  questionsForm!: FormGroup;
  isLoading = false;
  progress = 0;
  isCompleted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formationId = +params['id'];
      this.initForms();
    });
  }

  initForms(): void {
    this.testForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.questionsForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.addQuestion();
  }

  get questionsArray(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  createQuestionForm(): FormGroup {
    return this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(5)]],
      choices: this.fb.array([], Validators.minLength(2))
    });
  }

  createChoiceForm(): FormGroup {
    return this.fb.group({
      choiceText: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addQuestion(): void {
    const questionForm = this.createQuestionForm();
    const choicesArray = questionForm.get('choices') as FormArray;
    choicesArray.push(this.createChoiceForm());
    choicesArray.push(this.createChoiceForm());
    this.questionsArray.push(questionForm);
  }

  removeQuestion(index: number): void {
    if (this.questionsArray.length > 1) {
      this.questionsArray.removeAt(index);
      this.showMessage('Question supprimée', 'success');
    } else {
      this.showMessage('Vous devez avoir au moins une question', 'error');
    }
  }

  getChoicesArray(questionIndex: number): FormArray {
    return this.questionsArray.at(questionIndex).get('choices') as FormArray;
  }

  addChoice(questionIndex: number): void {
    const choicesArray = this.getChoicesArray(questionIndex);
    choicesArray.push(this.createChoiceForm());
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    const choicesArray = this.getChoicesArray(questionIndex);
    if (choicesArray.length > 2) {
      choicesArray.removeAt(choiceIndex);
    } else {
      this.showMessage('Une question doit avoir au moins 2 choix', 'error');
    }
  }

  onCorrectAnswerChange(questionIndex: number, choiceIndex: number): void {
    const choicesArray = this.getChoicesArray(questionIndex);
    for (let i = 0; i < choicesArray.length; i++) {
      choicesArray.at(i).get('isCorrect')?.setValue(false, { emitEvent: false });
    }
    choicesArray.at(choiceIndex).get('isCorrect')?.setValue(true);
  }

  // SIMPLIFIED: Just validate and move to next step
  createTest(): void {
    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched();
      this.showMessage('Veuillez remplir le titre du test', 'error');
      return;
    }

    this.progress = 30;
    this.showMessage('Test créé avec succès', 'success');

    // Move to next step immediately
    setTimeout(() => {
      this.progress = 50;
      if (this.stepper) {
        this.stepper.next();
      } else {
        console.log('Stepper not found');
      }
    }, 500);
  }

  validateQuestions(): boolean {
    for (let i = 0; i < this.questionsArray.length; i++) {
      const question = this.questionsArray.at(i);
      const choicesArray = this.getChoicesArray(i);

      if (question.get('questionText')?.invalid) {
        this.showMessage(`Question ${i + 1}: Texte requis`, 'error');
        return false;
      }

      let hasCorrectAnswer = false;
      for (let j = 0; j < choicesArray.length; j++) {
        const choice = choicesArray.at(j);
        if (choice.get('choiceText')?.invalid) {
          this.showMessage(`Question ${i + 1}: Choix ${j + 1} requis`, 'error');
          return false;
        }
        if (choice.get('isCorrect')?.value) {
          hasCorrectAnswer = true;
        }
      }

      if (!hasCorrectAnswer) {
        this.showMessage(`Question ${i + 1}: Sélectionnez une réponse correcte`, 'error');
        return false;
      }
    }
    return true;
  }

  saveQuestions(): void {
    if (!this.validateQuestions()) {
      return;
    }

    this.progress = 100;
    this.isCompleted = true;
    this.showMessage(`${this.questionsArray.length} question(s) enregistrée(s)`, 'success');
  }

  resetForm(): void {
    this.testForm.reset();
    while (this.questionsArray.length) {
      this.questionsArray.removeAt(0);
    }
    this.addQuestion();
    this.progress = 0;
    this.isCompleted = false;
    this.showMessage('Formulaire réinitialisé', 'info');
    if (this.stepper) {
      this.stepper.reset();
    }
  }

  goBack(): void {
    this.router.navigate(['/formateur/formations']);
  }

  showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
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
