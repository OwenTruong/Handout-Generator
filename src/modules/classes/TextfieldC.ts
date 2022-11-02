import { PDFDocument, PDFPage, PDFImage, PDFForm } from "pdf-lib";

import { checkData } from "@/functions/checkData";
import { checkType } from "@/functions/checkType";

export class TextfieldC {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  drawTextfield(pdfDoc: PDFDocument, page: PDFPage) {
    const form: PDFForm = pdfDoc.getForm();
    const textfield = form.createTextField('_');
    textfield.setText('Enter Here');

    // TODO: How to set width and height?

    textfield.addToPage(page, { x: this.x, y: this.y });
  }
}