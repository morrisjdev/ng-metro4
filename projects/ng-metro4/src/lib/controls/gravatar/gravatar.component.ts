import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GravatarDefaultsType} from '../../helper/types';

declare var $: any;

@Component({
  selector: 'm4-gravatar',
  templateUrl: './gravatar.component.html',
  styleUrls: ['./gravatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GravatarComponent implements OnInit {
  @Input() email: string;
  @Input() size = 80;
  @Input() default: GravatarDefaultsType|string;

  constructor() { }

  ngOnInit() {

  }

}
