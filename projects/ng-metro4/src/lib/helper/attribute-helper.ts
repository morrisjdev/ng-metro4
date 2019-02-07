import {ElementRef, Renderer2} from '@angular/core';

export class AttributeHelper {
  public static setAttribute(renderer: Renderer2, element: ElementRef, attribute: string, value?: any) {
    if (value) {
      renderer.setAttribute(element.nativeElement, attribute, value);
    } else {
      renderer.removeAttribute(element.nativeElement, attribute);
    }
  }
}
