// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { PDFDocument, StandardFonts } from 'pdf-lib';

import fs from "fs";

export async function pdftest(): Promise<void> {
  const pdfDoc = await PDFDocument.create();

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  const fontSize = 30;

  page.drawText('Hello World', {
    x:50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont
  });

  const pdfBytes = await pdfDoc.save();

  const pdf = fs.openSync("./test.pdf", "r+");
  fs.writeFileSync(pdf, pdfBytes);

}



