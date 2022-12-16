import { PDFDocument, PDFPage, PDFImage, PDFEmbeddedPage } from 'pdf-lib';

import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

export class PictureC {
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
  async drawImage(
    pdfDoc: PDFDocument,
    page: PDFPage,
    image: PDFImage,
    ext: String
  ): Promise<void> {
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    const fn = [pdfDoc.embedPng, pdfDoc.embedJpg];
    page.drawImage(image, options);
  }

  async drawPage(
    pdfDoc: PDFDocument,
    dstPage: PDFPage,
    srcPage: PDFEmbeddedPage
  ) {
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    dstPage.drawPage(srcPage, options);
  }
}
