import { PDFDocument, PDFPage, PDFImage } from 'pdf-lib';

import { OpaqueEnv } from '@classes/OpaqueEnv';

import { getFileExt } from '@functions/files/getFileExt';
import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

import { PictureI } from '@/interfaces/PictureI';

export class ImageC implements PictureI {
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
  async draw(pdfDoc: PDFDocument, page: PDFPage, path: string): Promise<void> {
    // TODO: draw pdf
  }
}
