import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { TrainingService } from '../training.service';
import { TrainingDetailsComponent } from '../training-details/training-details.component';
import { Training } from '../training.model';
import { RouterLink } from '@angular/router';

function toNumber(value: any) {
  return Number(value);
}

@Component({
  selector: 'tcc-training-details-route',
  standalone: true,
  imports: [TrainingDetailsComponent, RouterLink],
  template: `
    <a [routerLink]="['..']">back</a>
    @if (training(); as training) {
      <tcc-training-details [training]="training" (trainingSave)="onTrainingSave($event)"/>
    } @else {
      <p>Kein Training mit {{id}} gefunden</p>
    }
  `,
  styles: ``,
})
export class TrainingDetailsRouteComponent implements OnInit {
  trainingService = inject(TrainingService);

  @Input({ transform: toNumber }) id: number = -1;

  training!: Signal<Training | undefined>;

  ngOnInit() {
    this.training = this.trainingService.getById(this.id);
  }

  onTrainingSave($event: Partial<Training>) {
    this.trainingService.update(this.id, $event);
  }
}
