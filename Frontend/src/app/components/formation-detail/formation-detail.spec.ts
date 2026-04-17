import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDetailComponent } from './formation-detail';

describe('FormationDetail', () => {
  let component: FormationDetailComponent;
  let fixture: ComponentFixture<FormationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
