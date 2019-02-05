import {ObjectHelper} from './object-helper';
import {CompareHelper} from './compare-helper';

export class ArrayHelper {
  public static sequenceEquals(firstArray: any[], secondArray: any[]) {
    if (firstArray.length === secondArray.length) {
      for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] instanceof Array && secondArray[i] instanceof Array) {
          return this.sequenceEquals(firstArray[i], secondArray[i]);
        } else if (!CompareHelper.equal(firstArray[i], secondArray[i])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
