import { PDFDocument, PDFPage, PDFImage, PDFForm } from "pdf-lib";

import { checkData } from "@/functions/checkData";
import { checkType } from "@/functions/checkType";

export class TextfieldC {
  x: number;
  y: number;
  width: number;
  height: number;
  // TODO: Add backgroundColor, borderColor, borderWidth and font. Make some unchangeable constants

  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 300;
    this.height = 300;
  }

  drawTextfield(pdfDoc: PDFDocument, page: PDFPage) {
    const form: PDFForm = pdfDoc.getForm();
    const textfield = form.createTextField('_');
    textfield.setText('Enter Here');

    // TODO: How to set width and height?

    textfield.addToPage(page, { 
      x: this.x, 
      y: this.y, 
      width: this.width, 
      height: this.height });
  }
}