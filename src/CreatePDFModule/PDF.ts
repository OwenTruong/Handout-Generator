import { PDFDocument, PDFImage, PDFPage } from 'pdf-lib';

import { OpaqueEnv } from '@classes/OpaqueEnv';

// import { TemplateT } from "@/types/TemplateT";
// import { LineT } from "@/types/LineT";
// import { ImageT } from "@/types/ImageT";

// import { integrityCheck } from "@/functions/integrityCheck";

import { TemplateC } from '@classes/TemplateC';
import { PageC } from '@classes/PageC';
import { TextFieldC } from '@/classes/TextFieldC';
import { LineC } from '@classes/LineC';
import { ImageC } from '@/classes/ImageC';
import { TextC } from '@classes/TextC';
import { getFileExt } from './functions/files/getFileExt';
import { SrcPdfC } from './classes/PdfC';

export class PDF {
  #pdfDoc!: PDFDocument;
  #template!: TemplateC;
  #pdfBytes: Uint8Array | null = null;
  #created = false;

  async init(template: any): Promise<void> {
    this.#pdfDoc = await PDFDocument.create();
    this.#template = new TemplateC(template);
    this.#pdfBytes = null;
    this.#created = false;
  }

  async #save(): Promise<void> {
    if (!this.#pdfDoc) throw new Error('Need to call init first');
    this.#pdfBytes = await this.#pdfDoc.save();
  }

  async writePDF(path: string): Promise<void> {
    await this.#save();
    if (!this.#pdfBytes) throw new Error('Need to call init first');
    OpaqueEnv.writeFile(path, this.#pdfBytes);
  }

  // Embed a certain amount of images to a page given a template
  async #embedPicturesToPage(
    page: PDFPage,
    imgTemps: ImageC[],
    imgPaths: string[]
  ): Promise<void> {
    // if (imgTemps.length < imgPaths.length)
    //   return console.error('Too many images for a page.');
    // for (let i = 0; i < imgPaths.length; ++i) {
    //   const ext: string = getFileExt(imgPaths[i]);
    //   if (ext != 'pdf' && ext != 'jpg' && ext != 'png')
    //     throw new Error('FILE EXTENSION ERROR');
    //   const fileBytes: Buffer | null = OpaqueEnv.readFile(imgPaths[i]);
    //   // TODO FUTURE: Delete this if condition once browser is implemented
    //   if (!fileBytes)
    //     throw new Error(
    //       '(Temporary) Wrong environment: Browser not available yet'
    //     );
    //   if (ext == 'pdf') {
    //     // Loop through the pdf // FIXME: I feel like I am doing type casting wrong
    //     (imgTemps[i] as SrcPdfC).draw(this.#pdfDoc, page, fileBytes);
    //   } else if (ext == 'jpg') {
    //     (imgTemps[i] as JpgC).draw(this.#pdfDoc, page, fileBytes);
    //   } else if (ext == 'png') {
    //     (imgTemps[i] as PngC).draw(this.#pdfDoc, page, fileBytes);
    //   }
    // }
  }

  // #embedPdfToPage(page: PDFPage, pdfPages);

  // Embed lines to a page given a template
  #embedLinesToPage(page: PDFPage, lineTmps: LineC[]): void {
    for (let i = 0; i < lineTmps.length; ++i) {
      lineTmps[i].draw(page);
    }
  }

  #embedTextFieldToPage(page: PDFPage, fields: TextFieldC[]) {
    fields.forEach((field) => field.draw(this.#pdfDoc, page));
  }

  #embedTextToPage(page: PDFPage, textTmp: TextC, text: string): void {
    textTmp.draw(this.#pdfDoc, page, text);
  }

  async #getPictures(paths: string[]) {
    const pictures: (PDFPage | PDFImage)[] = [];
    for (const path of paths) {
      const ext = path.slice(-3);

      // if (ext == 'pdf') return this.#pdfDoc.embedPages
      const buffer: Buffer | null = OpaqueEnv.readFile(path);
      if (!buffer)
        throw new Error(
          '(Temporary) Wrong environment: Browser not available yet'
        );

      SrcPdfC.getPdfPages(buffer);

      if (ext == 'pdf') {
        pictures.concat(await SrcPdfC.getPdfPages(buffer));
      } else if (ext == 'png') {
        pictures.push(await this.#pdfDoc.embedPng(buffer));
      } else if (ext == 'jpg') {
        pictures.push(await this.#pdfDoc.embedJpg(buffer));
      } else throw new Error('Extension not found in file path');
    }
    return pictures;
  }

  async createPDF(dstPath: string, imgsPath: string): Promise<void> {
    // Error Checking
    if (!this.#pdfDoc)
      return console.error('Need to call init first before creating pdf');
    if (this.#created == true)
      return console.error(
        'PDF created already. To create a new one, please call init() before creating pdf'
      );

    const inputPathArr: string[] = OpaqueEnv.getFilePaths(imgsPath)([
      'png',
      'jpg',
      'pdf',
    ]);
    if (!inputPathArr) throw new Error('Source files Not Found');
    const pagesTemp: PageC[] = this.#template.pages;
    const pictures: (PDFPage | PDFImage)[] = await this.#getPictures(
      inputPathArr
    );

    // PRIORITY TODO: CLEAN UP EMBEDPICTURESTOPAGE TO USE PICTURES INSTEAD OF IT EMBEDDING ITSELF AND CREATE PDFC SO THAT WE HAVE A CLASS FOR CREATING PDFS, WORRY ABOUT THE FACT IF WE EVEN NEED A SEPARATE PDF / IMAGE CLASS FOR THIS NOW THAT WE HAVE TAKEN A LOT OF RESPONSIBILITY AWAY, AND ALSO WORRIES ABOUT (PdfPage | PdfImage)[] LOOKING UGLY... DO NOT BOTHER REFACTORING UNTIL YOU KNOW FOR FACT THAT YOU CAN EMBED SRCPDF INTO DSTPDF

    let pnum: number = 0;
    while (inputPathArr.length != 0) {
      // pageTemplate -> If template = 2, page 1, 3, 5 and etc follow temp1 and page 2, 4, 6 and etc follow temp2
      const pageTemp: PageC = pagesTemp[pnum % pagesTemp.length];
      const page = this.#pdfDoc.addPage(pageTemp.dim); // size: { width: 595.28, height: 841.89 }

      // Add Page Number to PDF
      const PageN: TextC | null = pageTemp.pageN;
      if (PageN != null)
        this.#embedTextToPage(page, PageN, (pnum + 1).toString());

      // Add Image/PDF to Destination PDF
      // TODO: Change PageC to accept SrcPdfC
      // TODO: Create embedPdf
      // TODO: Have SrcPdfC and ImageC implement PictureI for polymorphism

      // const pictureTemp: PictureI[] = pageTemp.images;
      // await this.#embedPicturesToPage(
      //   page,
      //   pictureTemp,
      //   inputPathArr.splice(
      //     0,
      //     Math.min(inputPathArr.length, pictureTemp.length)
      //   )
      // );

      // Add Line to PDF
      const lineTmps: LineC[] = pageTemp.lines;
      this.#embedLinesToPage(page, lineTmps);

      // Add Fields to PDF
      const fieldTmps: TextFieldC[] = pageTemp.fields;
      this.#embedTextFieldToPage(page, fieldTmps);

      pnum++;
    }

    this.#created = true;
  }
}
