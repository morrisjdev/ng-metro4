import {ElementRef, Renderer2} from '@angular/core';
import {observerClassExceptions} from './lists';

export class AttributeHelper {
  /**
   * Sets an attribute to the element or removes the attribute if no value is given
   * @param renderer The renderer
   * @param element The element
   * @param attribute The attribute
   * @param value The optional value
   */
  public static setAttribute(renderer: Renderer2, element: ElementRef, attribute: string, value?: any) {
    if (value) {
      renderer.setAttribute(element.nativeElement, attribute, value);
    } else {
      renderer.removeAttribute(element.nativeElement, attribute);
    }
  }

  /**
   * Creates a class observer on an element
   * @param element The element to observe
   * @param newClassValues The function to be called on change
   */
  public static createObserver(element: ElementRef,
                               newClassValues: (newClassValues: string[], oldClassValues: string[]) => void): MutationObserver {
    if (!element || !element.nativeElement) {
      return null;
    }

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
