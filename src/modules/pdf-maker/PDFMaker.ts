// TODO: Get the basic implementations down and then refactor it into a prototype class.

// import * as R from "ramda";
import { 
  PDFDocument,
  PDFImage,
  PDFPage,
  StandardFonts 
} from 'pdf-lib';

import fs from 'fs';


class ImageProperty {
  format: string;
  x: number;
  y: number;
  width: number;
  height: number;


  constructor(
    format: string, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) {
    this.format = format;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

}

// The goal is to make the outside look beautiful and the inside so-so
const drawImage = async function(
  pdfDoc: PDFDocument,
  page: PDFPage, 
  path: fs.PathOrFileDescriptor,

  // TODO: Should I use object destructuring or class or type?
  // is there a way to give this object a name so I can just pass it directly into page.drawImage?
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
  const pdfDoc = await PDFDocument.create();
  
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const xLen = 200;
  const yLen = 200;

  const pathArr = ["asset1.png", "asset2.png", "asset3.png"];
  const regex = /\.(png|jpg)$/;

  for (let i = 0; i < 3; ++i) {
    const result: string | undefined = (pathArr[i].match(regex) ?? [])[1];

    if (typeof result != 'string') throw new Error("Image Format Error");

    drawImage(pdfDoc, page, pathArr[i], new ImageProperty(result, 50, height - (i + 1) * (yLen + 50), xLen, yLen))
  }


  const pdfBytes = await pdfDoc.save();

  const pdf = fs.openSync("./test.pdf", "r+");
  fs.writeFileSync(pdf, pdfBytes);

}



