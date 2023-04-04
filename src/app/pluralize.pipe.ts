import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, singular: string, plural: string,...args: unknown[]): string {
    if (value <= 1) {
      return value + " " + singular;
    } else {
      return value + " " + plural;
    }
  }

}
