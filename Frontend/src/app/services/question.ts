import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { QuestionDTO } from './test';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  addQuestions(testId: number, questions: QuestionDTO[]): Observable<QuestionDTO[]> {
    const newQuestions = questions.map((q, index) => ({
      ...q,
      id: index + 1,
      choices: q.choices.map((c, cIndex) => ({
        ...c,
        id: cIndex + 1
      }))
    }));
    return of(newQuestions).pipe(delay(300));
  }
}
