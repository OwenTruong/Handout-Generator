// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { 
  PDFDocument,
  PDFImage,
  PDFPage,
  StandardFonts 
} from 'pdf-lib';

import fs from 'fs';


import { ImageC } from './classes/ImageC';
import { ImageT } from './types/ImageT';
import { findFiles } from './functions/findFiles';

import { d3_print_portrait } from './defaults';



// TODO: We are finally there... how should we create our PDF class?
export async function pdftest(): Promise<void> {
  const pdf = new PDF();
  // Get PDF Document
  const pdfDoc: PDFDocument = await PDFDocument.create();
  const page: PDFPage = pdfDoc.addPage();

  // Add Images to PDF
  const images: ImageT[] = d3_print_portrait.images.type1;
  const paths: string[] = findFiles('.')(['png', 'jpg']);
  // await ImageC.drawImages(pdfDoc, page, images, paths);

  // Speed of saving is a concern
  const pdfBytes: Uint8Array = await pdfDoc.save();

  // Write PDF to test.pdf
  fs.writeFileSync('./test.pdf', pdfBytes);

}


class PDF {
  #pdfDoc!: PDFDocument;
  #pdfBytes!: Uint8Array;
  #imgAdded = false;

  async init(): Promise<void> {
    this.#pdfDoc = await PDFDocument.create();
  }

  async save(): Promise<void> {
    if (!this.#pdfDoc) console.error('Need to call init() first');
    this.#pdfBytes = await this.#pdfDoc.save();
  }

  writeFile(path: string): void {
    if (!this.#pdfBytes) console.error('Need to call save() first');
    fs.writeFileSync(path, this.#pdfBytes);
  }

  // TODO: Finish embedImg
  async embedImgs(template: ImageT[], pageN: number): Promise<void> {
    // Check if we have already modified the images on this page yet
    // Check if template length is equivalent to paths length
    const paths: string[] = findFiles('.')(['png', 'jpg']);
    const page: PDFPage = this.#pdfDoc.addPage();
    // await ImageC.drawImages(this.pdfDoc, page, template, paths);
  }


}