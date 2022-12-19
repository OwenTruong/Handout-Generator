import { PDFPage } from 'pdf-lib';

import { checkData } from 'Archive/functions/checkData';
import { checkType } from 'Archive/functions/checkType';

export class LineC {
  x1: number;
  x2: number;
  y1: number;
  y2: number;

  constructor({
    x1,
    x2,
    y1,
    y2,
  }: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }) {
    if (
      !checkData(x1, x2, y1, y2) ||
      !checkType([x1, x2, y1, y2], Array(4).fill('number'))
    )
      throw new Error(
        `LineC Constructor Argument is Invalid: (${x1}, ${x2}, ${y1}, ${y2})`
      );

    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  draw(page: PDFPage) {
    page.drawLine({
      start: { x: this.x1, y: this.y1 },
      end: { x: this.x2, y: this.y2 },
    });
  }
}
