import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierCoursComponent } from './planifier-cours.component';

describe('PlanifierCoursComponent', () => {
  let component: PlanifierCoursComponent;
  let fixture: ComponentFixture<PlanifierCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifierCoursComponent]
    });
    fixture = TestBed.createComponent(PlanifierCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
