import {AfterContentInit, Component, ContentChild, Host, Input, Optional, SkipSelf, TemplateRef} from '@angular/core';
import {AbstractControl, ControlContainer, FormControlName} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ControlBase} from '../control-base';
import {M4FormGroup} from '../m4-form-group';

@Component({
  selector: 'm4-form-control-wrapper',
  templateUrl: './form-control-wrapper.component.html',
  styleUrls: ['./form-control-wrapper.component.css']
})
export class FormControlWrapperComponent implements AfterContentInit {
  @Input('label') label: string;
  @Input('description') description: string;
  @Input('show-errors') showErrors = true;

  public formGroup: M4FormGroup;

  @ContentChild(ControlBase, { static: true })
  public formControl: ControlBase<any>;

  @ContentChild('controlError', { static: true }) errorTemplate: TemplateRef<any>;

  public control: AbstractControl;

  public formControlName: string;
  public formName: string;
  public formPath: string;
  public formControlPath: string;
  public marginTop = false;

  private statusChangeSubscription: Subscription;

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) { }

  ngAfterContentInit(): void {
    const directives: FormControlName[] = (<any>this.controlContainer).directives;
    const controlIndex = directives.findIndex(d => d.valueAccessor === this.formControl);
    const formControlNameDirective = directives[controlIndex];

    this.marginTop = controlIndex > 0;
    this.formControlName = formControlNameDirective.name;
    this.formGroup = <M4FormGroup>this.controlContainer.control;
    this.formName = this.formGroup.name;
    this.formPath = `form.${this.formName}.`;
    this.formControlPath = `${this.formPath}${this.formControlName}.`;
    this.control = this.formGroup.get(this.formControlName);

    this.statusChangeSubscription = this.control.statusChanges.pipe(startWith(this.control.status))
      .subscribe((state) => {
        if (this.control.pristine) {
          return;
        }

        const validClasses = ['success'];
        const invalidClasses = ['alert'];

        const newClassValue = state === 'INVALID' ? invalidClasses : validClasses;
        const oldClassValue = state === 'INVALID' ? validClasses : invalidClasses;
        this.formControl.newClassValue(newClassValue, oldClassValue);
      });
  }

}
