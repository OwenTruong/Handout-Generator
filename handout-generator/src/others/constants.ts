import { rgb, RGB, StandardFonts } from 'pdf-lib';

export const pWidth = 595.28;
export const pHeight = 841.89;
export const lWidth = 841.89;
export const lHeight = 595.28;

export const mainFont: StandardFonts.Helvetica = StandardFonts.Helvetica;
export const mainColor: RGB = rgb(0, 0, 0);
export const defaultTempID: number = 30;

export const defaultTemplateList = [
  'OneTraitNothing',
  'OneTraitLine',
  'OneTraitField',
  'OneScapeNothing',

  'TwoTraitNothing',
  'TwoScapeLine',
  'TwoScapeField',

  'ThreeTraitLine',
  'ThreeTraitField',
  'ThreeScapeLine',
  'ThreeScapeField',

  'FourTraitLine',
  'FourScapeLine',
];
