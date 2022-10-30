import { PDFPage, PDFFont, RGB, rgb } from 'pdf-lib';

import { checkData } from "@/functions/checkData";
import { checkType } from "@/functions/checkType";

// TODO: Figure out the font of TextC in this class.

export class TextC {
  x: number;
  y: number;
  size: number;
  font: PDFFont;
  color: RGB;
  
  constructor(
    { x, y, size, font, color = rgb(0, 0, 0)}: { x: number, y: number, size: number, font: PDFFont, color: RGB }
  ) {
    // TODO: Check if checkType actually works with 'StandardFonts' and 'RGB' class
    if (
      !checkData(x, y, size, font, color) ||
      !checkType([x, y, size, font], [ ...Array(3).fill('number'), 'StandardFonts', 'RGB'])
    ) throw new Error('LineC Constructor Argument is Invalid');
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = font;
    this.color = color;
  }

  drawText(page: PDFPage, message: string) {
    page.drawText(message, {
      x: this.x,
      y: this.y,
      size: this.size,
      font: this.font
    })
  }
}