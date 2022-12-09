import { PDFDocument, PDFPage } from 'pdf-lib';

import { OpaqueEnv } from '@classes/OpaqueEnv';

// import { TemplateT } from "@/types/TemplateT";
// import { LineT } from "@/types/LineT";
// import { ImageT } from "@/types/ImageT";

// import { integrityCheck } from "@/functions/integrityCheck";

import { TemplateC } from '@classes/TemplateC';
import { PageC } from '@classes/PageC';
import { TextFieldC } from '@/classes/TextFieldC';
import { LineC } from '@classes/LineC';
import { ImageC } from '@classes/ImageC';
import { TextC } from '@classes/TextC';

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
  async #embedImgsToPage(
    page: PDFPage,
    imgTmps: ImageC[],
    imgPaths: string[]
  ): Promise<void> {
    if (imgTmps.length < imgPaths.length)
      return console.error('Too many images for a page.');

    for (let i = 0; i < imgPaths.length; ++i) {
      await imgTmps[i].drawImage(this.#pdfDoc, page, imgPaths[i]);
    }
  }

  // Embed lines to a page given a template
  #embedLinesToPage(page: PDFPage, lineTmps: LineC[]): void {
    for (let i = 0; i < lineTmps.length; ++i) {
      lineTmps[i].drawLine(page);
    }
  }

  #embedTextFieldToPage(page: PDFPage, fields: TextFieldC[]) {
    fields.forEach((field) => field.drawTextField(this.#pdfDoc, page));
  }

  #embedTextToPage(page: PDFPage, textTmp: TextC, text: string): void {
    textTmp.drawText(this.#pdfDoc, page, text);
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
      if (inputPathArr[0].slice(-3) == 'pdf') {
        // TODO: Change PageC to accept PdfC
        // TODO: Create embedPdf
        // TODO: Have PdfC and ImageC implement PictureI for polymorphism
      } else {
        const imgTmps: ImageC[] = pageTemp.images;
        await this.#embedImgsToPage(
          page,
          imgTmps,
          inputPathArr.splice(0, Math.min(inputPathArr.length, imgTmps.length))
        );
      }

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
