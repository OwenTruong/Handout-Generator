import { PDFDocument, PDFPage } from 'pdf-lib';

export interface PictureI {
  x: number;
  y: number;
  width: number;
  height: number;

  draw(pdfDoc: PDFDocument, page: PDFPage, path: string): Promise<void>;
}
