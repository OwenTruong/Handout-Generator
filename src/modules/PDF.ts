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
import { findFiles } from './functions/findFiles';

import { TemplateT } from './types/TemplateT';
import { LineT } from './types/LineT';
import { ImageT } from './types/ImageT';

import { d3_print_portrait } from './defaults';



export async function pdftest(): Promise<void> {
  const pdf: PDF = new PDF();
  await pdf.init(d3_print_portrait);

  // pdf.embedImgsToPage(1);
  pdf.createPDF('./test.pdf');

  await pdf.save();
  pdf.writeFile('./test.pdf');
}


// Pretty useless class, one use disposable...
class PDF {
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

  async save(): Promise<void> {
    if (!this.#pdfDoc) console.error('Need to call init first');
    this.#pdfBytes = await this.#pdfDoc.save();
  }

  writeFile(path: string): void {
    if (!this.#pdfBytes) console.error('Need to call save() first');
    
    // I am sure that this.#pdfBytes is not null
    fs.writeFileSync(path, this.#pdfBytes!);
  }

  // Embed a certain amount of images to a page given a template for a page
  async embedImgsToPage(page: PDFPage, files: string[], imgTmps: ImageT[]): Promise<void> {
    // const imgTmps: ImageT[] = this.#template.pages[1].images;

    // Check if template length is equivalent to paths length
    if (imgTmps.length != files.length) {
      console.error('Too many or too few image for a page.');
      return;
    }

    for (let i = 0; i < imgTmps.length; ++i) {
      const image = new ImageC(imgTmps[i].x, imgTmps[i].y, imgTmps[i].width, imgTmps[i].height);
      image.drawImage(this.#pdfDoc, page, files[i]);
    }
  }

  async createPDF(dstPath: string) {
    // First images, then lines, then date and page #

    // TODO: dynamically assign a page

    // Error Checking
    if (!this.#pdfDoc) console.error('Need to call init first');
    if (!this.#pdfBytes) console.error('Need to call save() first');
    if (this.#created == true) {
      console.error('PDF created already. To create a new one, please call init()');
      return;
    }

    // TODO: Check the amount of page templates. 
    // If there are two page templates, page 1, 3, 5 and etc. should follow page 1 template, and page 2, 4, 6 and etc. should follow page 2 template
    // Assign each page a page template and images that matches the image that should be on the page template
      // If the amount of images available is less than the amount specified by the page template, skip making the lines and the images after the last image is used


    const fileNames: string[] = findFiles('.')(['png', 'jpg']);
    const pages: { lines: LineT[], images: ImageT[] }[]  = this.#template.pages;
    let pnum: number = 0;

    // A while loop that adds everything to pages
    while (true) {
      // Condition
      // fileNames is empty
      if (fileNames.length == 0) break;
      const pageTemp: { lines: LineT[], images: ImageT[] } = pages[pnum % pages.length];
      const imgTmp: ImageT[] = pageTemp.images;

      fileNames.shift();
    }

    await this.save();
    this.writeFile(dstPath);
    this.#created = true;
  }


}