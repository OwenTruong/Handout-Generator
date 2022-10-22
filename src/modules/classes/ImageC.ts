import { PDFDocument, PDFPage, PDFImage } from "pdf-lib";

import fs from 'fs';

import { getFileExt } from "../functions/getFileExt";
import { ImageT } from '../types/ImageT';

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

  // A method that grabs bytes of an image with fs and add it to a page in a pdf
  // drawImage belongs in ImageC.prototype
  async drawImage(
    pdfDoc: PDFDocument,
    page: PDFPage, 
    path: string
  ): Promise<void> {
    const ext: string = getFileExt(path);
    if (ext != 'png' && ext != 'jpg') throw new Error('IMAGE FILE EXTENSION ERROR');

    const fileBytes: Buffer = fs.readFileSync(path);
    const image: PDFImage = await (ext == 'png' ? pdfDoc.embedPng(fileBytes) : pdfDoc.embedJpg(fileBytes));
  
    // We could pass ImageC directly but there is no guarantee I would not be changing ImageC in the future
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
    page.drawImage(image, options);
  }

  static async drawImages(
    pdfDoc: PDFDocument, 
    page: PDFPage, 
    images: ImageT[], 
    paths: string[]) {
      for (let i = 0; i < 3; ++i) {
        const img = new ImageC(images[i].x, images[i].y, images[i].width, images[i].height);
        await img.drawImage(pdfDoc, page, paths[i]);
      }
  }
}
