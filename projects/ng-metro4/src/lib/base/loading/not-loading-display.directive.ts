import {Directive, ElementRef, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {LoadingDirective} from './loading.directive';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[notLoading]'
})
export class NotLoadingDisplayDirective implements OnDestroy {
  private subscription: Subscription;
  private loadingState: boolean;
  private conditionValue: any;

  @Input()
  set notLoading(val) {
    this.conditionValue = val;
    this.updateView();
  }

  constructor(private element: ElementRef,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private loadingDirective: LoadingDirective) {
    this.subscription = this.loadingDirective.stateChange.subscribe((loading: boolean) => {
      this.loadingState = loading;
      this.updateView();
    });
  }

  private updateView() {
    this.viewContainer.clear();

    if (!this.loadingState || this.conditionValue) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
