import {ArrayHelper} from './array-helper';

export class ObjectHelper {
  public static compare(firstObject: any, secondObject: any) {
    if (firstObject instanceof Array && secondObject instanceof Array) {
      if (ArrayHelper.sequenceEquals(secondObject, firstObject)) {
        return true;
      }
    } else {
      if (firstObject === secondObject) {
        return true;
      }
    }

    return false;
  }
}
