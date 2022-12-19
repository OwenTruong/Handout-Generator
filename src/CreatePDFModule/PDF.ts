import { PDFDocument, PDFEmbeddedPage, PDFImage, PDFPage } from 'pdf-lib';
import { OpaqueEnv } from '@classes/OpaqueEnv';

import { TemplateC } from '@classes/TemplateC';
import { PageC } from '@classes/PageC';
import { TextFieldC } from '@/classes/TextFieldC';
import { LineC } from '@classes/LineC';
import { PictureC } from '@/classes/PictureC';
import { TextC } from '@classes/TextC';
import { getFileExt } from './functions/files/getFileExt';
import { PDFEmbeddedPicture } from './others/types';

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
    // FIXME: trying to save() gives error for embedding pdfpages => TypeError: `image` must be of type `PDFImage`, but was actually of type `NaN`

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
    pictureTemp: PictureC[],
    pictures: PDFEmbeddedPicture[]
  ): Promise<void> {
    pictureTemp.forEach((picTemp, i) => {
      if (!pictures[i]) return; // for templates with more than 1 picture per page, the last page might look empty
      picTemp.draw(page, pictures[i]);
    });
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

  static async getPdfPages(pdfBuffer: Buffer) {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    return pdfDoc.getPages();
  }

  async #getPictures(paths: string[]) {
    const pictures: PDFEmbeddedPicture[] = [];
    for (const path of paths) {
      const ext = path.slice(-3);

      // if (ext == 'pdf') return this.#pdfDoc.embedPages
      const buffer: Buffer | null = OpaqueEnv.readFile(path);
      if (!buffer)
        throw new Error(
          '(Temporary) Wrong environment: Browser not available yet'
        );

      if (ext == 'pdf') {
        const srcPages: PDFPage[] = await PDF.getPdfPages(buffer);
        const embeddedPages: PDFEmbeddedPicture[] = await Promise.all(
          srcPages.map(async (page) => {
            return {
              picture: await this.#pdfDoc.embedPage(page),
              type: 'page',
            };
          })
        );

        embeddedPages.forEach((page) => pictures.push(page));
      } else if (ext == 'png') {
        pictures.push({
          picture: await this.#pdfDoc.embedPng(buffer),
          type: 'image',
        });
      } else if (ext == 'jpg') {
        pictures.push({
          picture: await this.#pdfDoc.embedJpg(buffer),
          type: 'image',
        });
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
    const pictures: PDFEmbeddedPicture[] = await this.#getPictures(
      inputPathArr
    );

    let pnum: number = 0;
    while (pictures.length != 0) {
      // pageTemplate -> If template = 2, page 1, 3, 5 and etc follow temp1 and page 2, 4, 6 and etc follow temp2
      const pageTemp: PageC = pagesTemp[pnum % pagesTemp.length];
      const page = this.#pdfDoc.addPage(pageTemp.dim); // size: { width: 595.28, height: 841.89 }

      // Add Page Number to PDF
      const pageN: TextC | null = pageTemp.pageN;
      if (pageN != null)
        this.#embedTextToPage(page, pageN, (pnum + 1).toString());

      // Add Image/PDF to Destination PDF
      const pictureTemp: PictureC[] = pageTemp.pictures;
      const splicedPic = pictures.splice(
        0,
        Math.min(pictures.length, pictureTemp.length)
      );
      await this.#embedPicturesToPage(page, pageTemp.pictures, splicedPic);

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
