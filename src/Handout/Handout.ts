import { defaults } from '@/defaults/defaults';
import {
  PDFDocument,
  PDFEmbeddedPage,
  PDFForm,
  PDFImage,
  PDFPage,
  PDFTextField,
} from 'pdf-lib';
import { mainFont, mainColor, defaultTemplateList } from '@/others/constants';

import {
  Asset,
  Label,
  Line,
  Page,
  PDFEmbeddedPicture,
  Picture,
  Template,
  TemplateRepo,
  Textfield,
} from '@/others/types';

// export type PublicAsset = Asset;

export class Handout {
  #document!: PDFDocument;
  #template!: Template;

  /********
   * TEMPLATES METHODS
   ********/

  #getDefaultTemplate(id: string, defaults: Template[]): Template {
    for (let i = 0; i < defaults.length; i++) {
      if (id == defaults[i].id) return defaults[i];
    }

    throw new Error(
      'Template not found, here are some default templates you can try:\n' +
        defaultTemplateList.reduce(
          (result: string, id: string, i: number) =>
            result + '  - ' + id + '\n',
          ''
        )
    );
  }

  #fetchTemplate(): Template {
    const ph: unknown = null;
    return ph as Template;
  }

  #setTemplate(id: string, repo: TemplateRepo): void {
    this.#template =
      repo === 'default'
        ? this.#getDefaultTemplate(id, Object.values(defaults))
        : this.#fetchTemplate();
  }
  /********
   * EMBEDDING BYTES METHODS
   ********/

  async #getPdfPages(pdfBytes: Buffer): Promise<PDFPage[]> {
    const doc = await PDFDocument.load(pdfBytes);
    return doc.getPages();
  }

  async #embedBytes(assets: Asset[]): Promise<PDFEmbeddedPicture[]> {
    const pictures: PDFEmbeddedPicture[] = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      try {
        if (asset.type === 'pdf') {
          const srcPages: PDFPage[] = await this.#getPdfPages(asset.bytes);
          const embeddedPages: PDFEmbeddedPicture[] = await Promise.all(
            srcPages.map(async (page) => {
              return {
                picture: await this.#document.embedPage(page),
                type: 'page',
              };
            })
          );
          embeddedPages.forEach((page) => pictures.push(page));
        } else {
          const isJpg = asset.type === 'jpg' || asset.type === 'jpeg';
          const picture = await this.#document[isJpg ? 'embedJpg' : 'embedPng'](
            asset.bytes
          );
          pictures.push({
            picture,
            type: 'image',
          });
        }
      } catch (err) {
        console.error(
          `ERROR: Asset #${i} contains invalid ${asset.type} format.`
        );
      }
    }
    return pictures;
  }

  /********
   * EMBEDDING COMPONENTS METHODS
   ********/

  #createTextField(form: PDFForm): PDFTextField {
    try {
      return form.createTextField(String(Math.random() * 100));
    } catch (err) {
      return this.#createTextField(form);
    }
  }

  async #embedLabelToPage(page: PDFPage, labelDim: Label, text: string) {
    const font = await this.#document.embedFont(mainFont);
    page.drawText(text, Object.assign(labelDim, { font, color: mainColor }));
  }

  async #embedPicturesToPage(
    page: PDFPage,
    picturesDim: Picture[],
    pictures: PDFEmbeddedPicture[]
  ) {
    picturesDim.forEach((dim, i) => {
      // For templates with more than 1 picture per page, the last page might look empty
      // typescript -> js compiler can not handle random dynamic array
      const picture = pictures[i];
      if (!picture) return;

      if (picture.type === 'page')
        page.drawPage(picture.picture as PDFEmbeddedPage, dim);
      else if (picture.type === 'image')
        page.drawImage(picture.picture as PDFImage, dim);
      else throw new Error('Runtime Error with PDFEmbeddedPicture.type');
    });
  }
  async #embedLinesToPage(page: PDFPage, linesDim: Line[]) {
    for (let i = 0; i < linesDim.length; ++i) {
      const dim: Line = linesDim[i];
      page.drawLine({
        start: { x: dim.x1, y: dim.y1 },
        end: { x: dim.x2, y: dim.y2 },
      });
    }
  }
  async #embedFieldsToPage(page: PDFPage, fieldsDim: Textfield[]) {
    const font = await this.#document.embedFont(mainFont);
    for (const dim of fieldsDim) {
      const form: PDFForm = this.#document.getForm();
      const textField: PDFTextField = this.#createTextField(form);
      textField.setText('Enter Here');

      textField.addToPage(
        page,
        Object.assign(dim, { font, textColor: mainColor })
      );
    }
  }

  /********
   * CREATING HANDOUT METHODS
   ********/

  #save(): Promise<Uint8Array> {
    return this.#document.save();
  }

  async createHandout(assets: Asset[], templateId: string, repo: TemplateRepo) {
    this.#document = await PDFDocument.create();
    this.#setTemplate(templateId, repo);

    const pictures: PDFEmbeddedPicture[] = await this.#embedBytes(assets);

    let pnum = 0;
    while (pictures.length !== 0) {
      const pageTemplate: Page =
        this.#template.pages[pnum % this.#template.pages.length];
      const page: PDFPage = this.#document.addPage(pageTemplate.dim);

      // Add Page Number to PDF
      this.#embedLabelToPage(page, pageTemplate.pageN, (pnum + 1).toString());

      // Add Image/PDF to Destination PDF
      const splicedPic = pictures.splice(
        0,
        Math.min(pictures.length, pageTemplate.pictures.length)
      );
      this.#embedPicturesToPage(page, pageTemplate.pictures, splicedPic);

      // Add Line to PDF
      this.#embedLinesToPage(page, pageTemplate.lines);

      // Add Fields to PDF
      this.#embedFieldsToPage(page, pageTemplate.fields);
      pnum++;
    }

    return await this.#save();
  }
}

type PublicTemplateRepo = TemplateRepo;
type PublicAsset = Asset;

export { PublicTemplateRepo, PublicAsset };
// FIXME: Source Map does not work
