// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { 
  PDFDocument,
  PDFImage,
  PDFPage,
  StandardFonts } from 'pdf-lib';

import fs from "fs";


class ImageProperty {
  x: number;
  y: number;
  width: number;
  height: number;


  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

}


const drawImage = async function(
  pdfDoc: PDFDocument,
  page: PDFPage, 
  path: fs.PathOrFileDescriptor,

  // is there a way to give this object a name so I can just pass it directly into page.drawImage?
  { type, x, y, width, height }:
    { type: string, x: number, y: number, width: number, height: number }
): Promise<void> {
  // An unpure function that grabs bytes of an image from fs and add it to a page in a pdf
  const fileBytes: Buffer = fs.readFileSync(path);

  const image: PDFImage = await (type == 'png' ? pdfDoc.embedPng(fileBytes) : pdfDoc.embedJpg(fileBytes));

  page.drawImage(image, { x, y, width, height });
}





export async function pdftest(): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const xLen: number = 200;
  const yLen: number = 200;

  const img1: ImageProperty = new ImageProperty(50, height - (yLen + 50), xLen, yLen);
  const img2: ImageProperty = new ImageProperty(50, height - (yLen + 50) - (yLen + 50), xLen, yLen);
  const img3: ImageProperty = new ImageProperty(50, height - (yLen + 50) - (yLen + 50) - (yLen + 50), xLen, yLen);

  drawImage(pdfDoc, page, "asset1.png", Object.assign({ type: 'png' }, img1));
  drawImage(pdfDoc, page, "asset2.png", Object.assign({ type: 'png' }, img2));
  drawImage(pdfDoc, page, "asset3.png", Object.assign({ type: 'png' }, img3));


  const pdfBytes = await pdfDoc.save();

  const pdf = fs.openSync("./test.pdf", "r+");
  fs.writeFileSync(pdf, pdfBytes);

}



