import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ControlBase} from '../control-base';
import {DefaultValueAccessor} from '../../helper/default-value-accessor';

declare var $: any;

@Component({
  selector: 'm4-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [DefaultValueAccessor.get(SelectComponent)]
})
export class SelectComponent extends ControlBase<string|string[]> implements OnInit {
  @ViewChild('input', { read: ViewContainerRef }) private input;
  private select: any;

  ngOnInit() {
    $(this.input.element.nativeElement).html($(this.input.element.nativeElement).find('[options]').html());
    this.select = $(this.input.element.nativeElement).select().data('select');
    console.log(this.select);
  }

  disable(disabled: boolean) {
  }

  newValue() {

  }
}
