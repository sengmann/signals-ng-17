import { Routes } from '@angular/router';
import {TrainingListRouteComponent} from "./trainings/training-list-route/training-list-route.component";
import {TrainingDetailsRouteComponent} from "./trainings/training-details-route/training-details-route.component";

export const routes: Routes = [
  {path: 'training', component: TrainingListRouteComponent},
  {path: 'training/:id', component: TrainingDetailsRouteComponent},
  {path: '**', redirectTo: '/training'}
];
