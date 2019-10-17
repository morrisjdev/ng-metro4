import {AfterContentInit, Component, ContentChild, Host, Input, OnInit, Optional, SkipSelf, TemplateRef} from '@angular/core';
import {M4FormGroup} from '../m4-form-group';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'm4-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.css']
})
export class FormWrapperComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('show-errors') showErrors = true;

  @Input() formGroup: M4FormGroup;

  @ContentChild('formError', { static: true }) errorTemplate: TemplateRef<any>;

  public formName: string;
  public formPath: string;

  constructor() { }

  ngOnInit(): void {
    this.formName = this.formGroup.name;
    this.formPath = `form.${this.formName}.`;
  }
}
