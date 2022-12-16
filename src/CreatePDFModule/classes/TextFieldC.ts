import {
  PDFDocument,
  PDFPage,
  PDFImage,
  PDFForm,
  PDFTextField,
  RGB,
  rgb,
  StandardFonts,
  PDFFont,
} from 'pdf-lib';

import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

import { mainFont } from '@/others/constants';

export class TextFieldC {
  x: number;
  y: number;
  width: number;
  height: number;

  #bgColor: RGB = rgb(1, 1, 1);
  #borderColor: RGB = rgb(0, 0, 0);
  #borderWidth: number = 1;
  #font = mainFont; // Font might change in the future
  #textColor = rgb(0, 0, 0);

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
      !checkData(x, y, width, height) &&
      !checkType(
        [x, y, width, height],
        ['number', 'number', 'number', 'number']
      )
    )
      throw new Error('TextFieldC Object is Invalid');

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  #createTextField(form: PDFForm): PDFTextField {
    try {
      return form.createTextField(String(Math.random() * 100));
    } catch (err) {
      return this.#createTextField(form);
    }
  }

  // in PDF.ts accept this function as async
  async draw(pdfDoc: PDFDocument, page: PDFPage) {
    const form: PDFForm = pdfDoc.getForm();
    const textField: PDFTextField = this.#createTextField(form);
    textField.setText('Enter Here');

    const helv: PDFFont = await pdfDoc.embedFont(this.#font);

    textField.addToPage(page, {
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
