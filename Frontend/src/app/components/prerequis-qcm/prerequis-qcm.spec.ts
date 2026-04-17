import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisQcm } from './prerequis-qcm';

describe('PrerequisQcm', () => {
  let component: PrerequisQcm;
  let fixture: ComponentFixture<PrerequisQcm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisQcm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisQcm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
