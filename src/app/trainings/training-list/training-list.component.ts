import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Training} from "../training.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tcc-training-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul>
      @for (t of trainingList; track t.id) {
        <li (click)="onListItemClicked($event, t)" [class.discontinued]="t.discontinued">
          <a [routerLink]="[t.id]">{{ t.name }}</a>
        </li>
      } @empty {
        <li>Keine Trainings</li>
      }
    </ul>
  `,
  styles: `.discontinued { color: darkgray; text-decoration: line-through; }`
})
export class TrainingListComponent {

  @Input({required: true}) trainingList: Training[] = [];
  @Output() trainingSelected = new EventEmitter<Training>();

  onListItemClicked($event: MouseEvent, t: Training) {
    console.log(`$event: %o, training: %o`, $event, t);
    this.trainingSelected.emit(t);
  }
}
