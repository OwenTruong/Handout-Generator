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
  await pdf.init();

  pdf.embedImgToPage(d3_print_portrait.images.type1, 1);

  await pdf.save();
  pdf.writeFile('./test.pdf');
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
  // Embed a certain amount of images to a page given a template for a page
  async embedImgToPage(template: ImageT[], pageN: number): Promise<void> {
    // TODO: the amount of images to add to a page should not be determined by the amount of files in a folder
    const paths: string[] = findFiles('.')(['png', 'jpg']);

    // Check if we have already modified the images on this page yet
    if (this.#imgAdded == true) {
      console.error('Image already embedded');
      return;
    }
    // Check if template length is equivalent to paths length
    if (template.length != paths.length) {
      console.error('Too many or too few image for a page');
      return;
    }

    // TODO: Allow dynamic assignment of page
    const page: PDFPage = this.#pdfDoc.addPage();

    for (let i = 0; i < template.length; ++i) {
      const image = new ImageC(template[i].x, template[i].y, template[i].width, template[i].height);
      image.drawImage(this.#pdfDoc, page, paths[i]);
    }
    this.#imgAdded = true;
  }


}