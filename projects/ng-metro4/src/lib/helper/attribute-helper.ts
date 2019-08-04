import {ElementRef, Renderer2} from '@angular/core';
import {observerClassExceptions} from './lists';

export class AttributeHelper {
  public static setAttribute(renderer: Renderer2, element: ElementRef, attribute: string, value?: any) {
    if (value) {
      renderer.setAttribute(element.nativeElement, attribute, value);
    } else {
      renderer.removeAttribute(element.nativeElement, attribute);
    }
  }

  public static createObserver(element: ElementRef,
                               newClassValues: (newClassValues: string[], oldClassValues: string[]) => void): MutationObserver {
    let previousClassValue: string[] = [];
    const classValueCallback = () => {
      const classValue: string = element.nativeElement.getAttribute('class') || '';
      const classValueArray: string[] = classValue.split(' ')
        .filter(v => !!v && observerClassExceptions.indexOf(v) === -1);
      newClassValues(classValueArray, previousClassValue);
      previousClassValue = classValueArray;
    };
    const classObserver = new MutationObserver(classValueCallback);

    classObserver.observe(element.nativeElement, {
      attributeFilter: ['class'],
      attributes: true
    });

    classValueCallback();
    return classObserver;
  }
}
