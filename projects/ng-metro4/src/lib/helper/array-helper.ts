import {ObjectHelper} from './object-helper';

export class ArrayHelper {
  public static sequenceEquals(firstArray: any[], secondArray: any[]) {
    if (firstArray.length === secondArray.length) {
      for (let i = 0; i < firstArray.length; i++) {
        if (!ObjectHelper.compare(firstArray[i], secondArray[i])) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
