import {AfterContentInit, Component, ContentChild, Host, Input, Optional, SkipSelf, TemplateRef} from '@angular/core';
import {M4FormGroup} from '../m4-form-group';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'm4-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.css']
})
export class FormWrapperComponent implements AfterContentInit {
  @Input('title') title: string;
  @Input('description') description: string;

  public formGroup: M4FormGroup;

  @ContentChild('error', { static: true }) errorTemplate: TemplateRef<any>;

  public formName: string;
  public formPath: string;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) { }

  ngAfterContentInit(): void {
    this.formGroup = <M4FormGroup>this.controlContainer.control;
    this.formName = this.formGroup.name;
    this.formPath = `form.${this.formName}.`;
  }
}
