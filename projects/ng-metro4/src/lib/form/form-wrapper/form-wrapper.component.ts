import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {M4FormGroup} from '../m4-form-group';

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
