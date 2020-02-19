import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';
import {TypeAlias} from '../../helper/type-alias';
import {asapScheduler} from 'rxjs';
import {RoundTypeType} from '../../helper/types';
import {ObjectHelper} from '../../helper/object-helper';

declare var $: any;

@Component({
  selector: 'm4-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [DefaultValueAccessor.get(RatingComponent), TypeAlias.get(RatingComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent extends ControlBase<string|number> {

  @Input('stars') stars: number;
  @Input('round-func') roundFunc: RoundTypeType;
  @Input('values') values: (string|number)[];
  @Input('message') message: string;
  @Input('star-color') starColor: string;
  @Input('stared-color') staredColor: string;
  @Input('static') static: boolean;

  @Input('cls-rating') clsRating: string;
  @Input('cls-stars') clsStars: string;
  @Input('cls-result') clsResult: string;

  @ViewChild('input', { static: true }) private input: ElementRef;
  private rating: any;
  private clonedElement: any;

  createControl() {
    return new Promise<void>((complete) => {
      const originalElement = $(this.input.nativeElement);
      ObjectHelper.hide(originalElement);

      if (this.clonedElement) {
        this.clonedElement.parent().remove();
      }

      this.clonedElement = originalElement.clone();
      ObjectHelper.show(this.clonedElement);
      originalElement.parent().append(this.clonedElement);

      this.rating = this.clonedElement.rating().data('rating');

      this.clonedElement.parent().find('ul li').one('click', () => {
        this.touchCallback();
      });

      this.clonedElement.on('change', () => {
        const newValue = this.clonedElement.val();
        const valueParsed = +newValue;

        if (!Number.isNaN(valueParsed)) {
          this.changeValue(valueParsed);
        } else {
          this.changeValue(newValue);
        }
      });

      complete();
    });

  }

  disable(disabled: boolean): void {
    if (disabled) {
      this.clonedElement.parent().parent().addClass('disabled');
    } else {
      this.clonedElement.parent().parent().removeClass('disabled');
    }
  }

  newValue(): void {
    if (!this.rating) {
      return;
    }

    const stars = this.clonedElement.parent().find('ul li');
    stars.removeClass('on');

    if (this.values) {
      const index = this.values.indexOf(this.innerValue);

      if (index !== -1) {
        for (let i = 0; i <= index; i++) {
          $(stars.get(i)).addClass('on');
        }
      }
    } else {
      this.rating.val(this.innerValue);
    }

  }

  newClassValue(newClasses: string[], oldClasses: string[]) {
    asapScheduler.schedule(() => {
      if (this.clonedElement) {
        const target = this.clonedElement.parent();

        oldClasses.forEach((cls: string) => {
          target.removeClass(cls);
        });

        newClasses.forEach((cls: string) => {
          target.addClass(cls);
        });
      }
    });
  }

}
