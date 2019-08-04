import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {LoadingDirective} from './loading.directive';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[loading]'
})
export class LoadingDisplayDirective implements OnDestroy {
  private subscription: Subscription;

  constructor(private element: ElementRef,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private loadingDirective: LoadingDirective) {
    this.subscription = this.loadingDirective.stateChange.subscribe((loading: boolean) => {
      this.viewContainer.clear();

      if (loading) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
