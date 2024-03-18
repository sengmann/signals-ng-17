import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrainingService } from './trainings/training.service';
import { Training } from './trainings/training.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'tcc-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe],
  template: `
    <h1>tcc Manager App</h1>

    @if (bestOffer(); as bestOffer) {
      <div>Our best offer {{bestOffer.name}} - {{bestOffer.price | currency:'EUR'}}</div>
    }

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  bestOffer: Signal<Training | undefined> = inject(TrainingService).bestOffer;
}
