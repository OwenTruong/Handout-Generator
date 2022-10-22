import { PDFDocument, PDFPage, PDFImage } from "pdf-lib";

import fs from 'fs';

export class ImageC {
  format: string;
  x: number;
  y: number;
  width: number;
  height: number;


  constructor(
    format: string, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) {
    this.format = format;
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
    // An unpure function that grabs bytes of an image from fs and add it to a page in a pdf
    const fileBytes: Buffer = fs.readFileSync(path);
  
    const image: PDFImage = await (this.format == 'png' ? pdfDoc.embedPng(fileBytes) : pdfDoc.embedJpg(fileBytes));
  
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  
    page.drawImage(image, options);
  }
}
