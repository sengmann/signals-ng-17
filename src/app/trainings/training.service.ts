import { computed, Injectable, Signal, signal } from "@angular/core";
import { Training } from "./training.model";
import { TRAININGS } from "./training.mock";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  #trainings = signal(TRAININGS);
  trainings: Signal<Training[]> = this.#trainings.asReadonly();
  bestOffer: Signal<Training | undefined> = computed(
    () => this.trainings().sort((a, b) => a.price - b.price)[0],
  );

  getById(id: number): Signal<Training | undefined> {
    return computed(() => this.trainings().find((t) => t.id === id));
  }

  update(id: number, training: Partial<Training>) {
    this.#trainings.update((trainings) =>
      trainings.map((t) => (t.id === id ? { ...t, ...training } : t)),
    );
  }
}
