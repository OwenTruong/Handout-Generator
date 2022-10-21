// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { 
  PDFDocument,
  PDFImage,
  PDFPage,
  StandardFonts 
} from 'pdf-lib';

import fs from 'fs';


import { ImageProperty } from './classes/ImageProperty';
import { findFiles } from './functions/findFiles';

// The goal is to make the outside look beautiful and the inside so-so
const drawImage = async function(
  pdfDoc: PDFDocument,
  page: PDFPage, 
  path: fs.PathOrFileDescriptor,
  img: ImageProperty
): Promise<void> {
  // An unpure function that grabs bytes of an image from fs and add it to a page in a pdf
  const fileBytes: Buffer = fs.readFileSync(path);

  const image: PDFImage = await (img.format == 'png' ? pdfDoc.embedPng(fileBytes) : pdfDoc.embedJpg(fileBytes));

  const options = {
    x: img.x,
    y: img.y,
    width: img.width,
    height: img.height,
  }

  page.drawImage(image, options);
}




export async function pdftest(): Promise<void> {
  const pdfDoc: PDFDocument = await PDFDocument.create();
  
  const page: PDFPage = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const xLen = 200;
  const yLen = 200;


  const pathArr: string[] = findFiles('.')('png');

  for (let i = 0; i < 3; ++i) {
    const ext: string = pathArr[i].slice(-4);
    const format: string = ext.slice(1);
    
    if (ext[0] != '.' || (format != 'png' && format != 'jpg')) throw new Error("Wrong Image Extension");

    await drawImage(pdfDoc, page, pathArr[i], new ImageProperty(format, 50, height - (i + 1) * (yLen + 50), xLen, yLen));
  }

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