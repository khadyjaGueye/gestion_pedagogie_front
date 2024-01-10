import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutSessionComponent } from './form-ajout-session.component';

describe('FormAjoutSessionComponent', () => {
  let component: FormAjoutSessionComponent;
  let fixture: ComponentFixture<FormAjoutSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAjoutSessionComponent]
    });
    fixture = TestBed.createComponent(FormAjoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
