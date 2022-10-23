// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { 
  PDFDocument,
  PDFPage,
} from 'pdf-lib';

import fs from 'fs';


import { ImageC } from './classes/ImageC';

import { getFilePaths } from './functions/getFilePaths';

import { TemplateT } from './types/TemplateT';
import { LineT } from './types/LineT';
import { ImageT } from './types/ImageT';




// Pretty useless class, one use disposable...
export class PDF {
  #pdfDoc!: PDFDocument;
  #template!: TemplateT;
  #pdfBytes: Uint8Array | null = null;
  #created = false;

  async init(template: TemplateT): Promise<void> {
    this.#pdfDoc = await PDFDocument.create();
    this.#template = template;
    this.#pdfBytes = null;
    this.#created = false;
  }

  async #save(): Promise<void> {
    if (!this.#pdfDoc) console.error('Need to call init first');
    this.#pdfBytes = await this.#pdfDoc.save();
  }

  async write(path: string): Promise<void> {
    await this.#save();
    fs.writeFileSync(path, this.#pdfBytes!);
  }

  // Embed a certain amount of images to a page given a template for a page
  async embedImgsToPage(page: PDFPage, imgTmps: ImageT[], filePaths: string[]): Promise<void> {

    if (imgTmps.length < filePaths.length) {
      console.error('Too much image for a page.');
      return;
    }

    for (let i = 0; i < filePaths.length; ++i) {
      const image = new ImageC(imgTmps[i].x, imgTmps[i].y, imgTmps[i].width, imgTmps[i].height);
      await image.drawImage(this.#pdfDoc, page, filePaths[i]);
    }
  }




  async createPDF(dstPath: string, imgsPath: string) {
    // TODO: First images, then lines, then date and page #

    // Error Checking
    if (!this.#pdfDoc) console.error('Need to call init first before creating pdf');
    if (this.#created == true) {
      console.error('PDF created already. To create a new one, please call init() before creating pdf');
      return;
    }

    const filePaths: string[] = getFilePaths(imgsPath)(['png', 'jpg']);
    const pages: { lines: LineT[], images: ImageT[] }[]  = this.#template.pages;

    // A while loop that adds everything to pages
    let pnum: number = 0;
    while (true) {
      if (filePaths.length == 0) break;

      // pageTemplate -> If template = 2, page 1, 3, 5 and etc follow temp1 and page 2, 4, 6 and etc follow temp2
      const pageTemp: { lines: LineT[], images: ImageT[] } = pages[pnum % pages.length];
      const newPage = this.#pdfDoc.addPage();

      // TODO: Check if my refactor created any bug for this section of the code
      // Add Image to PDF
      const imgTmps: ImageT[] = pageTemp.images;
      await this.embedImgsToPage(newPage, imgTmps,
        filePaths.splice( 0, Math.min( filePaths.length, imgTmps.length ) )
      );

      pnum++;
    }

    this.#created = true;
  }


}