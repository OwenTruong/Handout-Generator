import { PDFDocument, PDFPage, PDFImage } from 'pdf-lib';

import { OpaqueEnv } from '@classes/OpaqueEnv';

import { getFileExt } from '@functions/files/getFileExt';
import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

export class ImageC {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    if (
      !checkData(x, y, width, height) ||
      !checkType([x, y, width, height], Array(4).fill('number'))
    )
      throw new Error('ImageC Constructor Argument is Invalid');

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // A method that grabs bytes of an image with fs and add it to a page in a pdf
  // draw belongs in ImageC.prototype
  async draw(
    pdfDoc: PDFDocument,
    page: PDFPage,
    fileBytes: Buffer,
    ext: String
  ): Promise<void> {
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    const fn = [pdfDoc.embedPdf, pdfDoc.embedPng, pdfDoc.embedJpg];

    const image = await fn[ext == 'pdf' ? 0 : ext == 'png' ? 1 : 2](fileBytes);
    // if (ext == 'pdf') page.drawPage()

    // TODO: create 3 if else conditions for pdf, png and jpg

    if ()

    page.drawImage(image, options);
  }
}
