export class CompareHelper {
  public static equal(firstObject: any, secondObject: any) {
    if (firstObject instanceof File && secondObject instanceof File) {
      return (<File>firstObject).name === (<File>secondObject).name;
    }

    if (firstObject === secondObject) {
      return true;
    }

    if (JSON.stringify(firstObject) === JSON.stringify(secondObject)) {
      return true;
    }

    return false;
  }
}
