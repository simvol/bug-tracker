import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseDate'
})
export class FirebaseDatePipe implements PipeTransform {
  transform(firebaseDate: any): any {
    return new Date(firebaseDate.seconds * 1000);
  }
}
