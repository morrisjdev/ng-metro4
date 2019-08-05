import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagInputComponent} from './form/tag-input/tag-input.component';
import {SelectComponent} from './form/select/select.component';
import {InputComponent} from './form/input/input.component';
import {TextareaComponent} from './form/textarea/textarea.component';
import {CheckboxComponent} from './form/checkbox/checkbox.component';
import {RadioComponent} from './form/radio/radio.component';
import {FileInputComponent} from './form/file-input/file-input.component';
import {KeypadComponent} from './form/keypad/keypad.component';
import {SliderComponent} from './form/slider/slider.component';
import {SpinnerComponent} from './form/spinner/spinner.component';
import {RatingComponent} from './form/rating/rating.component';
import {DateTimeComponent} from './form/date-time/date-time.component';
import {ContainerComponent} from './base/container/container.component';
import {GridComponent} from './base/grid/grid.component';
import {FormComponent} from './base/form/form.component';
import {ButtonComponent} from './base/button/button.component';
import {IconComponent} from './base/icon/icon.component';
import {GravatarComponent} from './controls/gravatar/gravatar.component';
import {DonutComponent} from './controls/donut/donut.component';
import {ProgressComponent} from './controls/progress/progress.component';
import {HintComponent} from './information/hint/hint.component';
import {ToastComponent} from './information/toast/toast.component';
import {NotifyComponent} from './information/notify/notify.component';
import {DialogComponent} from './information/dialog/dialog.component';
import {PopoverComponent} from './controls/popover/popover.component';
import {PanelComponent} from './controls/panel/panel.component';
import {HotkeyComponent} from './controls/hotkey/hotkey.component';
import {LoadingComponent} from './base/loading/loading.component';
import {LetComponent} from './base/let/let.component';

const routes: Routes = [
  { path: 'form/tag-input', component: TagInputComponent },
  { path: 'form/select', component: SelectComponent },
  { path: 'form/input', component: InputComponent },
  { path: 'form/textarea', component: TextareaComponent },
  { path: 'form/checkbox', component: CheckboxComponent },
  { path: 'form/radio', component: RadioComponent },
  { path: 'form/file-input', component: FileInputComponent },
  { path: 'form/keypad', component: KeypadComponent },
  { path: 'form/slider', component: SliderComponent },
  { path: 'form/spinner', component: SpinnerComponent },
  { path: 'form/rating', component: RatingComponent },
  { path: 'form/datetime', component: DateTimeComponent },

  { path: 'base/container', component: ContainerComponent },
  { path: 'base/grid', component: GridComponent },
  { path: 'base/form', component: FormComponent },
  { path: 'base/button', component: ButtonComponent },
  { path: 'base/icon', component: IconComponent },
  { path: 'base/loading', component: LoadingComponent },
  { path: 'base/let', component: LetComponent},

  { path: 'controls/gravatar', component: GravatarComponent },
  { path: 'controls/donut', component: DonutComponent },
  { path: 'controls/progress', component: ProgressComponent },
  { path: 'controls/popover', component: PopoverComponent },
  { path: 'controls/panel', component: PanelComponent },
  { path: 'controls/hotkey', component: HotkeyComponent },

  { path: 'information/hint', component: HintComponent },
  { path: 'information/toast', component: ToastComponent },
  { path: 'information/notify', component: NotifyComponent },
  { path: 'information/dialog', component: DialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
