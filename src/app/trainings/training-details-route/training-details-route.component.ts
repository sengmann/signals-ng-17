import {Component, inject, input, numberAttribute, OnInit, Signal} from '@angular/core';
import {TrainingService} from "../training.service";
import {TrainingDetailsComponent} from "../training-details/training-details.component";
import {Training} from "../training.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tcc-training-details-route',
  standalone: true,
  imports: [
    TrainingDetailsComponent, RouterLink
  ],
  template: `
    <a [routerLink]="['..']">back</a>&nbsp;<a [routerLink]="['..', id() + 1]">next</a>
    @if (training(); as training) {
      <tcc-training-details [training]="training" (trainingSave)="onTrainingSave($event)"/>
    } @else {
      <p>Kein Training mit {{id()}} gefunden</p>
    }
  `,
  styles: ``
})
export class TrainingDetailsRouteComponent implements OnInit {
  trainingService = inject(TrainingService);

  id = input(-1, {transform: numberAttribute});

  training!: Signal<Training | undefined>;

  ngOnInit() {
    this.training = this.trainingService.getById(this.id);
  }

  onTrainingSave($event: Partial<Training>) {
    this.trainingService.update(this.id(), $event);
  }
}
