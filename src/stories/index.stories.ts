import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { number, withKnobs, boolean } from '@storybook/addon-knobs';

import { Welcome, Button } from '@storybook/angular/demo';
import {ButtonDirective, SliderComponent} from 'ng-metro4';

storiesOf('Welcome', module).add('to Storybook', () => ({
  component: Welcome,
  props: {},
}));

storiesOf('Button', module)
  .add('with text', () => ({
    component: Button,
    props: {
      text: 'Hello Button',
    },
  }))
  .add(
    'with some emoji',
    () => ({
      component: Button,
      props: {
        text: '😀 😎 👍 💯',
      },
    }),
    { notes: 'My notes on a button with emojis' }
  )
  .add(
    'with some emoji and action',
    () => ({
      component: Button,
      props: {
        text: '😀 😎 👍 💯',
        onClick: action('This was clicked OMG'),
      },
    }),
    { notes: 'My notes on a button with emojis' }
  );

storiesOf('Another Button', module).add('button with link to another story', () => ({
  component: Button,
  props: {
    text: 'Go to Welcome Story',
    onClick: linkTo('Welcome'),
  },
}));

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    component: SliderComponent,
    props: {
      min: number('Minimum', 0),
      max: number('Maximum', 100),
      showMinMax: boolean('Show min/max', false),
      ngModel: 50,
      ngModelChange: action('ngModelChange')
    }
  }));
