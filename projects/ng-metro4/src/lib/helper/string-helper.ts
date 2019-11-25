// @dynamic
export class StringHelper {
  /**
   * Creates a GUID
   */
  public static guid(): string {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c: string): string => {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );

    return uuid;
  }

  public static createHash(object: any): string {
    return JSON.stringify(object || null);
  }
}
