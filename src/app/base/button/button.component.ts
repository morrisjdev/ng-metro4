import { Component, OnInit } from '@angular/core';
import {accentDictionary, AccentType, buttonShapeDictionary, ButtonShapeType, sizeDictionary, SizeType} from 'ng-metro4';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {

  btnMarkup = `<button m4-button [btn-style]="style" [outline]="outline" [rounded]="rounded" [shape]="shape" [disabled]="disabled"
        [shadow]="shadow" [flat]="flat" [size]="size">
  <m4-icon *ngIf="showIcon" icon="checkmark"></m4-icon>
  <span *ngIf="showText">Example button</span>
</button>`;

  shapes = buttonShapeDictionary;
  styles = accentDictionary;
  sizes = sizeDictionary;

  style: AccentType;
  shape: ButtonShapeType;
  size: SizeType;
  showIcon = false;
  showText = true;
  disabled = false;
  outline = false;
  rounded = false;
  shadow = false;
  flat = false;

  hotkey = 'alt+2';


  type = '';


  color = '#ff0000';

  constructor() { }

  ngOnInit() {
  }

  test() {
    alert('Hotkey clicked');
  }

}
