import {
  accentDictionary,
  activityDictionary,
  activityStyleDictionary,
  animationDictionary,
  buttonShapeDictionary,
  buttonSpecialDictionary, calendarButtonDictionary,
  colorDictionary, easingDictionary, fileReadModeDictionary,
  gravatarDictionary,
  iconCategoryDictionary,
  iconDictionary, inputDictionary,
  popoverTriggerDictionary,
  positionBaseDictionary,
  positionDictionary,
  positionHorizontalDictionary,
  positionVerticalDictionary,
  progressTypeDictionary,
  roundTypeDictionary,
  sizeDictionary, spinnerButtonPositionDictionary,
  thinDictionary,
  widePointDictionary
} from './lists';

export type WidePointType = keyof typeof widePointDictionary;

export type CalendarButtonType = keyof typeof calendarButtonDictionary;

export type AccentType = keyof typeof accentDictionary;

export type InputType = keyof typeof inputDictionary;

export type PositionVerticalType = keyof typeof positionVerticalDictionary;
export type PositionHorizontalType = keyof typeof positionHorizontalDictionary;
export type PositionBaseType = keyof typeof positionBaseDictionary;
export type PositionType = keyof typeof positionDictionary;

export type SpinnerButtonPositionType = keyof typeof spinnerButtonPositionDictionary;

export type SizeType = keyof typeof sizeDictionary;

export type ColorType = keyof typeof colorDictionary;

export type GravatarDefaultsType = keyof typeof gravatarDictionary;

export type ActivityType = keyof typeof activityDictionary;
export type ActivityStyleType = keyof typeof activityStyleDictionary;

export type IconCategoryType = keyof typeof iconCategoryDictionary;
export type IconType = keyof typeof iconDictionary;

export type AnimationType = keyof typeof animationDictionary;

export type ButtonShapeType = keyof typeof buttonShapeDictionary;
export type ButtonSpecialType = keyof typeof buttonSpecialDictionary;

export type PopoverTriggerType = keyof typeof popoverTriggerDictionary;

export type ProgressTypeType = keyof typeof progressTypeDictionary;

export type RoundTypeType = keyof typeof roundTypeDictionary;

export type ThinType = keyof typeof thinDictionary;

export type EasingType = keyof typeof easingDictionary;

export type FileReadModeType = keyof typeof fileReadModeDictionary;
