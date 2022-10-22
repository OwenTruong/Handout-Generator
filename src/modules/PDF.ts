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
import { getFileExts } from './functions/getFileExts';

import { d3_print_portrait } from './defaults';



// TODO: How do I make imagesArr look clean?...
const drawImages = async function(pdfDoc: PDFDocument, page: PDFPage, pathArr: string[], ) {

}






export async function pdftest(): Promise<void> {
  const pdfDoc: PDFDocument = await PDFDocument.create();
  
  const page: PDFPage = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const imagesArr = d3_print_portrait.images.type1;
  const pathArr: string[] = findFiles('.')('png');

  // TODO: We have outsourced our template info to defaults.ts, now we have to remove this ugly for loop too

  for (let i = 0; i < 3; ++i) {
    // const ext: string = pathArr[i].slice(-4);
    // const format: string = ext.slice(1);

    // if (ext[0] != '.' || (format != 'png' && format != 'jpg')) throw new Error("Wrong Image Extension");

    getFileExts(pathArr[i]);

    const img = new ImageC(imagesArr[i].x, imagesArr[i].y, imagesArr[i].width, imagesArr[i].height);
    await img.drawImage(pdfDoc, page, pathArr[i]);
  }
  console.log("Outside");

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