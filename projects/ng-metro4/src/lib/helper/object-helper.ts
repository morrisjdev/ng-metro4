import {ArrayHelper} from './array-helper';
import {CompareHelper} from './compare-helper';

export class ObjectHelper {
  /**
   * Compares to objects
   * @param firstObject The first object
   * @param secondObject The second object
   */
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

  /**
   * Hides an HTML object
   * @param object The HTML object
   */
  public static hide(object: any) {
    object.addClass('d-none');
  }

  /**
   * Shows an HTML object
   * @param object The HTML object
   */
  public static show(object: any) {
    object.removeClass('d-none');
  }
}
