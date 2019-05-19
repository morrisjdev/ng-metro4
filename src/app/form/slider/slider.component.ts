import {Component} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent {
  model = 23;
  buffer = 12;
  alert = true;
}
