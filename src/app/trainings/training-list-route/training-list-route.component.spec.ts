import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingListRouteComponent } from './training-list-route.component';

describe('TrainingListRouteComponent', () => {
  let component: TrainingListRouteComponent;
  let fixture: ComponentFixture<TrainingListRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingListRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingListRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
