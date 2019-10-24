import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'executeFunctionOnce'
})
export class ExecuteFunctionOncePipe implements PipeTransform {

  transform(value: Function, ...parameters: any[]): any {
    return value(...parameters);
  }

}
