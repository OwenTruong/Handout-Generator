// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { 
  PDFDocument,
  PDFPage,
} from 'pdf-lib';

import fs from 'fs';


import { ImageC } from './classes/ImageC';
import { findFiles } from './functions/findFiles';

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
  async embedImgsToPage(page: PDFPage, files: string[], imgTmps: ImageT[]): Promise<void> {
    if (imgTmps.length < files.length) {
      console.error('Too much image for a page.');
      return;
    }

    for (let i = 0; i < files.length; ++i) {
      const image = new ImageC(imgTmps[i].x, imgTmps[i].y, imgTmps[i].width, imgTmps[i].height);
      image.drawImage(this.#pdfDoc, page, files[i]);
    }
  }




  async createPDF(dstPath: string) {
    // TODO: First images, then lines, then date and page #
    // TODO: Check if it works with a multi-paged template

    // Error Checking
    if (!this.#pdfDoc) console.error('Need to call init first before creating pdf');
    if (this.#created == true) {
      console.error('PDF created already. To create a new one, please call init() before creating pdf');
      return;
    }

    const fileNames: string[] = findFiles('.')(['png', 'jpg']);
    const pages: { lines: LineT[], images: ImageT[] }[]  = this.#template.pages;

    // A while loop that adds everything to pages
    let pnum: number = 0;
    while (true) {
      if (fileNames.length == 0) break;

      // pageTemplate -> If template = 2, page 1, 3, 5 and etc follow temp1 and page 2, 4, 6 and etc follow temp2
      const pageTemp: { lines: LineT[], images: ImageT[] } = pages[pnum % pages.length];
      const newPage = this.#pdfDoc.addPage();

      // Add Image to PDF
      const imgTmps: ImageT[] = pageTemp.images;
      // If the amount of img files are less than the amount of images in a page template:
      const files: string[] = fileNames.length >= imgTmps.length ? 
                    fileNames.splice(0, imgTmps.length) : 
                    fileNames.splice(0, fileNames.length);
      await this.embedImgsToPage(newPage, files, imgTmps);

      pnum++;
    }

    this.#created = true;
  }


}