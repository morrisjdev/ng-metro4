import {animationDictionary, colorDictionary, iconCategoryDictionary, iconDictionary} from './lists';

export type WidePointType = 'fs'|'sm'|'md'|'lg'|'xl'|'xxl';
export type AccentType = ''|'primary'|'secondary'|'success'|'alert'|'warning'|'yellow'|'info'|'dark'|'light'|'link';
export type PositionType = 'left'|'top-left'|'top'|'top-right'|'right'|'bottom-right'|'bottom'|'bottom-left';
export type SizeType = ''|'mini'|'small'|'large';

export type GravatarDefaultsType = 'mm'|'identicon'|'monsterid'|'wavatar'|'retro'|'robohash'|'blank';

export type ActivityType = 'ring'|'metro'|'square'|'cycle'|'simple';
export type ActivityStyleType = ''|'dark'|'color';

export type ColorType = keyof typeof colorDictionary;
export type IconCategoryType = keyof typeof iconCategoryDictionary;
export type IconType = keyof typeof iconDictionary;
export type AnimationType = keyof typeof animationDictionary;
