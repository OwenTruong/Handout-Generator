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







export async function pdftest(): Promise<void> {
  const pdfDoc: PDFDocument = await PDFDocument.create();
  
  const page: PDFPage = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // TODO: Any way to shorten this?
  const images: ImageT[] = d3_print_portrait.images.type1;
  const paths: string[] = findFiles('.')(['png', 'jpg']);
  await ImageC.drawImages(pdfDoc, page, images, paths);

  // Speed of saving is a concern
  const pdfBytes: Uint8Array = await pdfDoc.save();

  fs.writeFileSync('./test.pdf', pdfBytes);

}





// class PDFFactory {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }


// }