import { Component, OnInit } from '@angular/core';
import {accentDictionary, AccentType, buttonShapeDictionary, ButtonShapeType, sizeDictionary, SizeType} from 'ng-metro4';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {

  basicButtons = `<button m4-button>button</button>
<button m4-button btn-style="primary">button</button>
<button m4-button btn-style="secondary">button</button>
<button m4-button btn-style="success">button</button>
<button m4-button btn-style="alert">button</button>
<button m4-button btn-style="warning">button</button>
<button m4-button btn-style="yellow">button</button>
<button m4-button btn-style="info">button</button>
<button m4-button btn-style="dark">button</button>
<button m4-button btn-style="light">button</button>
<button m4-button btn-style="link">button</button>`;

  iconButton = `<button m4-button><m4-icon icon="add"></m4-icon> button</button>`;

  outlineButtons = `<button m4-button [outline]="true">button</button>
<button m4-button [outline]="true" btn-style="primary">button</button>
<button m4-button [outline]="true" btn-style="secondary">button</button>
<button m4-button [outline]="true" btn-style="success">button</button>
<button m4-button [outline]="true" btn-style="alert">button</button>
<button m4-button [outline]="true" btn-style="warning">button</button>
<button m4-button [outline]="true" btn-style="yellow">button</button>
<button m4-button [outline]="true" btn-style="info">button</button>
<button m4-button [outline]="true" btn-style="dark">button</button>
<button m4-button [outline]="true" btn-style="light">button</button>
<button m4-button [outline]="true" btn-style="link">button</button>`;

  buttonsSizes = `<button m4-button btn-style="primary" size="mini">button</button>
<button m4-button btn-style="primary" size="small">button</button>
<button m4-button btn-style="primary">button</button>
<button m4-button btn-style="primary" size="large">button</button>
<button m4-button btn-style="primary" [outline]="true" size="mini">button</button>
<button m4-button btn-style="primary" [outline]="true" size="small">button</button>
<button m4-button btn-style="primary" [outline]="true">button</button>
<button m4-button btn-style="primary" [outline]="true" size="large">button</button>`;

  roundedCode = `<button m4-button btn-style="primary" [rounded]="true">button</button>`;

  shapesCode = `<button m4-button btn-style="primary" shape="square"><m4-icon icon="checkmark"></m4-icon></button>
<button m4-button btn-style="primary" shape="cycle"><m4-icon icon="checkmark"></m4-icon></button>`;

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
