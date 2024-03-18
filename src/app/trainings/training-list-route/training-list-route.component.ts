import {Component, inject, OnInit, Signal} from '@angular/core';
import {Training} from "../training.model";
import {TrainingService} from "../training.service";
import {TrainingListComponent} from "../training-list/training-list.component";

@Component({
  selector: 'tcc-training-list-route',
  standalone: true,
  imports: [
    TrainingListComponent
  ],
  template: `
    Anzahl der angebotenen Trainings: {{ trainings().length }}
    <tcc-training-list [trainingList]="trainings()" />
  `,
  styles: ``
})
export class TrainingListRouteComponent{
  trainings: Signal<Training[]> = inject(TrainingService).trainings;
}
