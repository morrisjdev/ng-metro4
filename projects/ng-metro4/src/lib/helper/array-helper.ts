import {CompareHelper} from './compare-helper';

export class ArrayHelper {
  /**
   * Check if two sequences are equal
   * @param firstArray First array
   * @param secondArray Second array
   */
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

  /**
   * Checks if an array contains a specific object
   * @param array The array to check
   * @param object The object to search for
   */
  public static contains(array: any[], object: any) {
    return array.findIndex(v => CompareHelper.equal(v, object)) !== -1;
  }
}
