import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSpecialOffer',
  standalone: true
})
export class IsSpecialOfferPipe implements PipeTransform {

  transform(value: number, upperLimit: number = 1500, lowerLimit = 0.01): boolean {
    const lowerBound = Math.min(lowerLimit, upperLimit)
    const upperBound = Math.max(lowerLimit, upperLimit)

    return lowerBound <= value && upperBound >= value;
  }

}
