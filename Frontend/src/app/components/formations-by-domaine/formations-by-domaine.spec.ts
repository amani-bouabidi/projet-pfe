import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsByDomaine } from './formations-by-domaine';

describe('FormationsByDomaine', () => {
  let component: FormationsByDomaine;
  let fixture: ComponentFixture<FormationsByDomaine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationsByDomaine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationsByDomaine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
