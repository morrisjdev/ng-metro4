export class ArrayHelper {
  public static sequenceEquals(firstArray: any[], secondArray: any[]) {
    if (firstArray.length === secondArray.length) {
      for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
