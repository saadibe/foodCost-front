import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultProductImage'
})
export class DefaultProductImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if( value )return value
    return 'assets/defaultimage.png';
  }

}
