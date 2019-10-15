import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, ElementRef,
  Input, ModuleWithComponentFactories, NgModule, OnChanges,
  OnInit, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgMetro4Module} from 'ng-metro4';
import {FormsModule} from '@angular/forms';
import {
  accentDictionary,
  activityDictionary, activityStyleDictionary,
  animationDictionary,
  buttonShapeDictionary,
  buttonSpecialDictionary,
  colorDictionary, easingDictionary, gravatarDictionary,
  iconDictionary, inputDictionary, popoverTriggerDictionary,
  positionBaseDictionary,
  positionDictionary,
  positionHorizontalDictionary,
  positionVerticalDictionary, progressTypeDictionary, roundTypeDictionary,
  sizeDictionary, thinDictionary,
  widePointDictionary
} from '../../../../projects/ng-metro4/src/lib/helper/lists';

@Component({
  selector: 'app-doc-component',
  templateUrl: './doc-component.component.html',
  styleUrls: ['./doc-component.component.less']
})
export class DocComponentComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() showModel: boolean;

  @Input() values: any;

  html: string;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container: ViewContainerRef;
  @ViewChild('htmlElement', {static: true}) htmlElementRef: ElementRef;

  private componentRef: ComponentRef<any>;
  model: any;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler) {
  }

  compileTemplate() {
    const values = this.htmlElementRef.nativeElement.innerText.split('\\n');
    const html = values.map(v => `<span class="p-1">${v}</span>`).join('\n')
      .split('\\l').join('').split('\\t').join('').split('\\i').join('');

    this.html = values.map(v => v.trim()).map(v =>
      v.split('\\l').map(vInner => vInner.trim()).join('\n')
        .split('\\t').join('\t')).join('\n')
      .split('\\i').filter((v, i) => i % 2 === 0).join('');

    const metadata = {
      selector: `runtime-component-sample`,
      template: html
    };

    const factory = this.createComponentFactorySync(this.compiler, metadata, null);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);
    this.model = this.componentRef.instance.model;
  }

  ngOnInit() {
    this.compileTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.compileTemplate();
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const inputValues = this.values;

    const cmpClass = componentClass || class RuntimeComponent {
      buttonShapeDictionary = buttonShapeDictionary;
      buttonSpecialDictionary = buttonSpecialDictionary;
      iconDictionary = iconDictionary;
      colorDictionary = colorDictionary;
      animationDictionary = animationDictionary;
      accentDictionary = accentDictionary;
      widePointDictionary = widePointDictionary;
      positionHorizontalDictionary = positionHorizontalDictionary;
      positionVerticalDictionary = positionVerticalDictionary;
      positionBaseDictionary = positionBaseDictionary;
      positionDictionary = positionDictionary;
      sizeDictionary = sizeDictionary;
      activityDictionary = activityDictionary;
      gravatarDictionary = gravatarDictionary;
      activityStyleDictionary = activityStyleDictionary;
      popoverTriggerDictionary = popoverTriggerDictionary;
      progressTypeDictionary = progressTypeDictionary;
      roundTypeDictionary = roundTypeDictionary;
      thinDictionary = thinDictionary;
      easingDictionary = easingDictionary;
      inputDictionary = inputDictionary;

      constructor() {
        if (inputValues) {
          Object.keys(inputValues).forEach((k) => {
            (<any>this)[k] = inputValues[k];
          });
        }
      }
    };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({imports: [CommonModule, NgMetro4Module, FormsModule], declarations: [decoratedCmp]})
    class RuntimeComponentModule { }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

}
