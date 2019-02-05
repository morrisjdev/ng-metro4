import {ArrayHelper} from './array-helper';
import {CompareHelper} from './compare-helper';

export class ObjectHelper {
  public static compare(firstObject: any, secondObject: any) {
    if (firstObject instanceof Array && secondObject instanceof Array) {
      if (ArrayHelper.sequenceEquals(secondObject, firstObject)) {
        return true;
      }
    } else {
      return CompareHelper.equal(firstObject, secondObject);
    }

    return false;
  }
}
