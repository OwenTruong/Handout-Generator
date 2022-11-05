import {
  PDFDocument,
  PDFPage,
  PDFImage,
  PDFForm,
  RGB,
  rgb,
  StandardFonts,
  PDFFont,
} from 'pdf-lib';

import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

import { mainFont } from '@constants/constants';

export class TextfieldC {
  x: number;
  y: number;
  width: number;
  height: number;

  #bgColor: RGB = rgb(0, 0, 0);
  #borderColor: RGB = rgb(0, 0, 0);
  #borderWidth: number = 1;
  #font = mainFont; // Font might change in the future
  #textColor = rgb(0, 0, 0);

  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 300;
    this.height = 300;
  }

  // in PDF.ts accept this function as async
  async drawTextfield(pdfDoc: PDFDocument, page: PDFPage) {
    const form: PDFForm = pdfDoc.getForm();
    const textfield = form.createTextField('_');
    textfield.setText('Enter Here');

    // TODO: How to set width and height?

    const helv: PDFFont = await pdfDoc.embedFont(this.#font);

    textfield.addToPage(page, {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      textColor: this.#textColor,
      backgroundColor: this.#bgColor,
      borderColor: this.#borderColor,
      borderWidth: this.#borderWidth,
      font: helv,
    });
  }
}
