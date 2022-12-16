import { PDFDocument, PDFPage, RGB, rgb } from 'pdf-lib';

import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

import { mainFont } from '@/others/constants';

export class TextC {
  x: number;
  y: number;
  size: number;
  //font: PDFFont | null;
  color: RGB;

  constructor({
    x,
    y,
    size,
    color = [0, 0, 0],
  }: {
    x: number;
    y: number;
    size: number;
    color: number[];
  }) {
    if (!checkData(x, y, size, color))
      throw new Error(
        `TextC Argument Data is Missing: (${x}, ${y}, ${size}, ${color})`
      );

    if (!checkType([x, y, size], [...Array(3).fill('number')]))
      throw new Error(
        `TextC Argument Type is Invalid: (${x}, ${y}, ${size}, ${color})`
      );

    if (!checkType(color, ['number', 'number', 'number']))
      throw new Error(
        `TextC Color Argument is Invalid: (${x}, ${y}, ${size}, ${color})`
      );

    this.x = x;
    this.y = y;
    this.size = size;
    this.color = rgb(color[0], color[1], color[2]);
  }

  async draw(
    pdfDoc: PDFDocument,
    page: PDFPage,
    message: string
  ): Promise<void> {
    const font = await pdfDoc.embedFont(mainFont);
    if (!font)
      return console.error(
        'Unexpected error in retrieving Helvetica font in draw method of TextC'
      );

    page.drawText(message, {
      x: this.x,
      y: this.y,
      size: this.size,
      font,
      color: this.color,
    });
  }
}
