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
  // drawImage belongs in ImageC.prototype
  async drawImage(
    pdfDoc: PDFDocument,
    page: PDFPage,
    path: string
  ): Promise<void> {
    const ext: string = getFileExt(path);
    if (ext != 'png' && ext != 'jpg')
      throw new Error('IMAGE FILE EXTENSION ERROR');

    // need a better one than null...
    const fileBytes: Buffer | null = OpaqueEnv.readFile(path);
    // TODO FUTURE: Delete this if condition once browser is implemented
    if (!fileBytes)
      throw new Error(
        '(Temporary) Wrong environment: Browser not available yet'
      );
    const image: PDFImage = await (ext == 'png'
      ? pdfDoc.embedPng(fileBytes)
      : pdfDoc.embedJpg(fileBytes));

    // We could pass ImageC directly but there is no guarantee I would not be changing ImageC in the future
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
    page.drawImage(image, options);
  }
}