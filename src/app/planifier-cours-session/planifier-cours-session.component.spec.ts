import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierCoursSessionComponent } from './planifier-cours-session.component';

describe('PlanifierCoursSessionComponent', () => {
  let component: PlanifierCoursSessionComponent;
  let fixture: ComponentFixture<PlanifierCoursSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifierCoursSessionComponent]
    });
    fixture = TestBed.createComponent(PlanifierCoursSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
