import { PDFEmbeddedPage, PDFImage } from 'pdf-lib';

export type Label = {
  x: number;
  y: number;
  size: number;
};

export type Line = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export type Textfield = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Picture = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Page = {
  pageN: Label;
  lines: Line[];
  pictures: Picture[];
  fields: Textfield[];
  dim: [number, number];
};

type Id =
  | 'OneTraitNothing'
  | 'OneTraitLine'
  | 'OneTraitField'
  | 'OneScapeNothing'
  | 'TwoTraitNothing'
  | 'TwoScapeLine'
  | 'TwoScapeField'
  | 'ThreeTraitLine'
  | 'ThreeTraitField'
  | 'ThreeScapeLine'
  | 'ThreeScapeField'
  | 'FourTraitNothing'
  | 'FourScapeNothing'
  | string;

export type Template = {
  id: Id;
  name: string;

  pages: Page[];
};

export type Extension = 'jpg' | 'jpeg' | 'pdf' | 'png';

export type Asset = {
  type: Extension;
  bytes: Buffer;
};

// type = image | pdf
export type PDFEmbeddedPicture = {
  picture: PDFEmbeddedPage | PDFImage;
  type: 'page' | 'image';
};

export type TemplateRepo = 'default' | 'online';
