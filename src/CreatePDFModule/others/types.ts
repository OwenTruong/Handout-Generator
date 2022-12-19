import { PDFEmbeddedPage, PDFImage, PDFPage } from 'pdf-lib';

// type = image | pdf
export type PDFEmbeddedPicture = {
  picture: PDFEmbeddedPage | PDFImage;
  type: 'page' | 'image';
};
