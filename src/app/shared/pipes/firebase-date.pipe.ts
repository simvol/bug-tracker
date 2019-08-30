import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseDate'
})
export class FirebaseDatePipe implements PipeTransform {
  transform(firebaseDate: any): Date {
    if (firebaseDate && firebaseDate.seconds) {
      return new Date(firebaseDate.seconds * 1000);
    } else {
      return new Date();
    }
  }
}
