import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepteOuAnnulerComponent } from './accepte-ou-annuler.component';

describe('AccepteOuAnnulerComponent', () => {
  let component: AccepteOuAnnulerComponent;
  let fixture: ComponentFixture<AccepteOuAnnulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccepteOuAnnulerComponent]
    });
    fixture = TestBed.createComponent(AccepteOuAnnulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
