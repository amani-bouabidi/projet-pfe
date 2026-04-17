import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TestRequestDTO {
  formationId: number;
  titre: string;
}

export interface TestResponseDTO {
  id: number;
  titre: string;
  formationId: number;
  formationTitre: string;
  questions: QuestionDTO[];
}

export interface QuestionDTO {
  id?: number;
  questionText: string;
  choices: ChoiceDTO[];
}

export interface ChoiceDTO {
  id?: number;
  choiceText: string;
  isCorrect: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests: TestResponseDTO[] = [];

  createTest(testData: TestRequestDTO): Observable<TestResponseDTO> {
    const newTest: TestResponseDTO = {
      id: this.tests.length + 1,
      titre: testData.titre,
      formationId: testData.formationId,
      formationTitre: 'Formation Test',
      questions: []
    };
    this.tests.push(newTest);
    return of(newTest).pipe(delay(300));
  }

  getTestByFormation(formationId: number): Observable<TestResponseDTO | null> {
    const test = this.tests.find(t => t.formationId === formationId);
    return of(test || null).pipe(delay(200));
  }
}
