import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[m4Let]',
  exportAs: 'let'
})
export class LetDirective {

  @Input()
  set m4Let(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  private context: any = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
