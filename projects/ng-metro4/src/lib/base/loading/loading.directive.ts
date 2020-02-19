import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {AttributeHelper} from '../../helper/attribute-helper';

@Directive({
  selector: '[m4-loading]'
})
export class LoadingDirective implements OnInit, OnChanges {
  @Input('m4-loading') subscription: Subscription;
  @Input() disabled: boolean;

  public stateChange = new EventEmitter<boolean>();

  private registeredTeardownLogic: Subscription;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  private createElement() {
    if (this.registeredTeardownLogic) {
      this.registeredTeardownLogic.unsubscribe();
    }

    if (this.subscription) {
      this.setDisabled(!this.subscription.closed);

      this.registeredTeardownLogic = this.subscription.add(() => {
        this.setDisabled(!this.subscription.closed);
      });
    } else {
      this.setDisabled(false);
    }
  }

  private setDisabled(loading: boolean) {
    this.stateChange.emit(loading);
    AttributeHelper.setAttribute(this.renderer, this.element, 'disabled', this.disabled || loading);
  }

  ngOnInit(): void {
    this.createElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createElement();
  }
}
