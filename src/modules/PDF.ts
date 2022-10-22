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

import { d3_print_portrait } from './defaults';



// TODO: How do I make imagesArr look clean?...
const drawImages = async function(pdfDoc: PDFDocument, page: PDFPage, pathArr: string[], imagesArr) {

}






export async function pdftest(): Promise<void> {
  const pdfDoc: PDFDocument = await PDFDocument.create();
  
  const page: PDFPage = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const imagesArr = d3_print_portrait.images.type1;
  const pathArr: string[] = findFiles('.')('png');

  // TODO: We have outsourced our template info to defaults.ts, now we have to remove this ugly for loop too

  pathArr.forEach(async (path, i) => {
    // path, i, imagesArr, pdfDoc, page
    const ext: string = path.slice(-4);
    const format: string = ext.slice(1);
    const image = imagesArr[i];

    if (ext[0] != '.' || (format != 'png' && format != 'jpg')) throw new Error("Wrong Image Extension");

    const img = new ImageC(format, image.x, image.y, image.width, image.height);
    await img.drawImage(pdfDoc, page, path);
    console.log("Inside");
  });

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