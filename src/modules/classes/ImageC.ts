import { PDFDocument, PDFPage, PDFImage } from "pdf-lib";

import fs from 'fs';

export class ImageC {
  x: number;
  y: number;
  width: number;
  height: number;


  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }


  async drawImage(
    pdfDoc: PDFDocument,
    page: PDFPage, 
    path: fs.PathOrFileDescriptor
  ): Promise<void> {
    // TODO: Replace this hardcoded format with const format = getFileExts
    const format = 'png';
    // An unpure function that grabs bytes of an image from fs and add it to a page in a pdf
    const fileBytes: Buffer = fs.readFileSync(path);
    const image: PDFImage = await (format == 'png' ? pdfDoc.embedPng(fileBytes) : pdfDoc.embedJpg(fileBytes));
  
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  
    page.drawImage(image, options);
  }
}
