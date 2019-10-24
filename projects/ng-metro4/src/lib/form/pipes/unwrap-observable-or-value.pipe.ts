import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Pipe({
  name: 'unwrapObservableOrValue',
  pure: false
})
export class UnwrapObservableOrValuePipe implements PipeTransform, OnDestroy {

  private previousValue: Observable<any>;
  private innerValue: any;

  private subscription: Subscription;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  transform(value: any|Observable<any>): any {
    if (!(value instanceof Observable)) {
      return value;
    }

    if (!this.subscription) {
      if (!value) {
        return this.innerValue;
      }

      this.previousValue = value;

      this.subscription = value
        .subscribe((output: string) => {
          this.innerValue = output;
          this.cdRef.markForCheck();
        });
    }

    if (value !== this.previousValue) {
      this.ngOnDestroy();
      return this.transform(value);
    }

    return this.innerValue;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.innerValue = null;
    this.subscription = null;
  }
}
