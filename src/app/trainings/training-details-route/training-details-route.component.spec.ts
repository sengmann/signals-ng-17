import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDetailsRouteComponent } from './training-details-route.component';

describe('TrainingDetailsRouteComponent', () => {
  let component: TrainingDetailsRouteComponent;
  let fixture: ComponentFixture<TrainingDetailsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDetailsRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingDetailsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
