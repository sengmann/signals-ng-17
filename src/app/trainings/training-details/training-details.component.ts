import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Training} from "../training.model";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {IsSpecialOfferPipe} from "../is-special-offer.pipe";

const discontinuedValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const group = control as FormGroup;
  const invalid = group.controls['discontinued'].value === true && group.controls['price'].value !== null
  return invalid ? { discontinuedWithPrice: true } : null;
}

@Component({
  selector: 'tcc-training-details',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, IsSpecialOfferPipe],
  template: `
    <h3>{{ training.name }}</h3>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>Name: <input [formControl]="form.controls.name"/></label>
        @if (form.controls.name.invalid) {
          <span [class.has-error]="form.controls.name.dirty" [class.has-warning]="form.controls.name.pristine">
            Please enter a name
          </span>
        }
      </div>
      <div>
        <label>Description: <input [formControl]="form.controls.description"/></label>
        @if (form.controls.description.getError('minlength'); as error) {
          <span
            [class.has-warning]="form.controls.description.pristine"
            [class.has-error]="form.controls.description.dirty"
          >
            Your description is to short. Please enter at least {{ error.requiredLength - error.actualLength }}
            more characters
          </span>

        }
      </div>
      <div [class.is-special-offer]="training.price | isSpecialOffer">
        <label>Price: <input [formControl]="form.controls.price" type="number"/></label>
        @if (form.controls.price.invalid) {
          <span [class.has-warning]="form.controls.price.pristine"
                [class.has-error]="form.controls.price.dirty"
          >
            @if (form.controls.price.getError('min'); as error) {
              <span>
                Please enter a price greater or equal than {{ error.min }}&nbsp;€
              </span>
            } @else if (form.controls.price.hasError('required')) {
              <span>Please enter a price</span>
            }
          </span>
        }
      </div>
      <div>
        <label><input type="checkbox" [formControl]="form.controls.discontinued"> Discontinued</label>
        @if(form.hasError('discontinuedWithPrice')) {
          <span [class.has-warning]="form.controls.discontinued.pristine && form.controls.price.pristine"
                [class.has-error]="form.controls.discontinued.dirty || form.controls.price.dirty">
             Trainings that are discontinued can't have a price.
          </span>
        }
      </div>
      @if (training.imageUrl) {
        <img [src]="training.imageUrl">
      }
      <div>
        <button [disabled]="form.invalid">Save</button>
      </div>
    </form>
  `,
  styles: `.is-special-offer { color: red } .has-error { color: red } .has-warning { color: orange }`
})
export class TrainingDetailsComponent implements OnInit {
  @Input({required: true}) training!: Training;
  @Output() trainingSave = new EventEmitter<Partial<Training>>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.minLength(10)),
    discontinued: new FormControl(false),
    price: new FormControl(0, Validators.min(200)),
  }, discontinuedValidator)

  ngOnInit() {
    this.form.patchValue(this.training)
  }

  onSubmit() {
    this.trainingSave.emit(this.form.value as any)
  }
}
