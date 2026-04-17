import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationStepper } from './formation-stepper';

describe('FormationStepper', () => {
  let component: FormationStepper;
  let fixture: ComponentFixture<FormationStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationStepper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
