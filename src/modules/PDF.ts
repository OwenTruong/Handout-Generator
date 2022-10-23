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
  #template!: any;
  #pdfBytes: Uint8Array | null = null;
  #created = false;

  async init(template: Object): Promise<void> {
    this.#pdfDoc = await PDFDocument.create();
    this.#template = template;
    this.#pdfBytes = null;
    this.#created = false;
  }

  async save(): Promise<void> {
    if (!this.#pdfDoc) console.error('Need to call init() first');
    this.#pdfBytes = await this.#pdfDoc.save();
  }

  writeFile(path: string): void {
    if (!this.#pdfBytes) console.error('Need to call save() first');
    
    // I am sure that this.#pdfBytes is not null
    fs.writeFileSync(path, this.#pdfBytes!);
  }

  // TODO: Finish embedImg
  // Embed a certain amount of images to a page given a template for a page
  async embedImgsToPage(page: PDFPage): Promise<void> {
    // TODO: the amount of images to add to a page should not be determined by the amount of files in a folder
    const paths: string[] = findFiles('.')(['png', 'jpg']);
    const imgTmps: ImageT[] = this.#template.images.type1;

    // Check if template length is equivalent to paths length
    if (imgTmps.length != paths.length) {
      console.error('Too many or too few image for a page');
      return;
    }

    for (let i = 0; i < imgTmps.length; ++i) {
      const image = new ImageC(imgTmps[i].x, imgTmps[i].y, imgTmps[i].width, imgTmps[i].height);
      image.drawImage(this.#pdfDoc, page, paths[i]);
    }
  }

  async createPDF(dstPath: string) {
    // First images, then lines, then date and page #

    // TODO: dynamically assign a page

    // Check if we have already modified images onto a pdf before
    if (this.#created == true) {
      console.error('PDF created already. To create a new one, please call init()');
      return;
    }

    // TODO: Check the amount of page templates. 
    // If there are two page templates, page 1, 3, 5 and etc. should follow page 1 template, and page 2, 4, 6 and etc. should follow page 2 template
    // Assign each page a page template and images that matches the image that should be on the page template
      // If the amount of images available is less than the amount specified by the page template, skip making the lines and the images after the last image is used


    await this.save();
    this.writeFile(dstPath);
    this.#created = true;
  }


}