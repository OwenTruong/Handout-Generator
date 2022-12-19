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

export type Template = {
  id?: number;
  name: string;

  pages: Page[];
};

export type Extension = 'jpg' | 'pdf' | 'png';

export type Asset = {
  type: Extension;
  bytes: Buffer;
};

// type = image | pdf
export type PDFEmbeddedPicture = {
  picture: PDFEmbeddedPage | PDFImage;
  type: 'page' | 'image';
};
