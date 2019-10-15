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

@Component({
  selector: 'app-doc-component',
  templateUrl: './doc-component.component.html',
  styleUrls: ['./doc-component.component.less']
})
export class DocComponentComponent implements OnInit, OnChanges {

  @Input() title: string;


  html: string;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container: ViewContainerRef;
  @ViewChild('htmlElement', {static: true}) htmlElementRef: ElementRef;

  private componentRef: ComponentRef<{}>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler) {
  }

  compileTemplate() {
    const values = this.htmlElementRef.nativeElement.innerText.split('\\n');
    const html = values.map(v => `<span class="p-1">${v}</span>`).join('\n')
      .split('\\l').join('').split('\\t').join('');

    this.html = values.map(v => v.trim()).map(v =>
      v.split('\\l').map(vinner => vinner.trim()).join('\n')
        .split('\\t').join('\t')).join('\n');

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
  }

  ngOnInit() {
    this.compileTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.compileTemplate();
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const cmpClass = componentClass || class RuntimeComponent {
    };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({imports: [CommonModule, NgMetro4Module, FormsModule], declarations: [decoratedCmp]})
    class RuntimeComponentModule {
    }

    const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

}
