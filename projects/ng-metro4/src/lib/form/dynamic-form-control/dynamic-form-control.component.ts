import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Host,
  Input,
  ModuleWithComponentFactories,
  NgModule, OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ControlOptions, M4FormControl} from '../m4-form-control';
import {ControlContainer, FormGroup} from '@angular/forms';
import {NgMetro4Module} from '../../ng-metro4.module';
import {ControlBase} from '../control-base';
import {M4FormGroup} from '../m4-form-group';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'm4-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.css']
})
export class DynamicFormControlComponent implements OnInit, OnDestroy {
  @Input() control: M4FormControl;

  @ViewChild('container', {read: ViewContainerRef, static: true}) private container: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  private statusChangeSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler,
              @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) { }

  ngOnInit() {
    const factory = this.createComponentFactorySync(this.compiler, this.control);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);

    this.statusChangeSubscription = this.control.statusChanges.pipe(startWith(this.control.status))
      .subscribe((state) => {
        if (this.control.pristine) {
          return;
        }

        const validClasses = ['success'];
        const invalidClasses = ['alert'];

        const newClassValue = state === 'INVALID' ? invalidClasses : validClasses;
        const oldClassValue = state === 'INVALID' ? validClasses : invalidClasses;
        this.componentRef.instance.newClassValue(newClassValue, oldClassValue);
      });
  }

  private createComponentFactorySync(compiler: Compiler, control: M4FormControl): ComponentFactory<any> {
    const metadata = {
      selector: `m4-dynamic-form-control-runtime-component`,
      template: `<m4-${control.controlType} [formControl]="control" #dynamicFormComponent></m4-${control.controlType}>`
    };

    class DynamicFormControlRuntimeComponent implements OnInit {
      // @ts-ignore
      @ViewChild('dynamicFormComponent', { static: true }) dynamicFormComponent: ControlBase<any>;

      control = control;

      constructor() {}

      ngOnInit(): void {
        this.setControlOptions(this.control.controlOptions);
      }

      private setControlOptions(controlOptions: ControlOptions) {
        if (controlOptions) {
          Object.keys(controlOptions).forEach((key: any) => {
            this.dynamicFormComponent.updateProperty(key, controlOptions[key]);
          });
        }
      }

      public newClassValue(newClassValue: string[], oldClassValue: string[]) {
        this.dynamicFormComponent.newClassValue(newClassValue, oldClassValue);
      }
    }
    const decoratedComponent = Component(metadata)(DynamicFormControlRuntimeComponent);

    @NgModule({imports: [NgMetro4Module], declarations: [decoratedComponent]})
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === DynamicFormControlRuntimeComponent);
  }

  ngOnDestroy(): void {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
