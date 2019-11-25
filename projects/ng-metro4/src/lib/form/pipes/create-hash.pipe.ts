import { Pipe, PipeTransform } from '@angular/core';
import {StringHelper} from '../../helper/string-helper';

@Pipe({
  name: 'createHash'
})
export class CreateHashPipe implements PipeTransform {

  transform(value: any): string {
    return StringHelper.createHash(value);
  }

}
