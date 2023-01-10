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

export { Asset, TemplateRepo };

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

    // TODO: Complete wrapper for jpg, jpeg, png, and pdf
    const wrapper = (errorMsg: string) => {
      return async <T>(executeable: () => T): Promise<T | undefined> => {
        try {
          return await executeable();
        } catch (_) {
          // FIXME: Cannot read properties of undefined (reading 'context')
          console.log(_);
          console.error(errorMsg);
          return undefined;
        }
      };
    };

    // TODO: Object.bind doesn't work well with typescript and trying to map certain asset types(jpg, jpeg, png and pdf) to certain functions doesn't work...
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const verify = wrapper(`ERROR: Invalid ${asset.type} at asset #${i}`);
      if (asset.type === 'jpg' || asset.type === 'jpeg') {
        const picture: PDFImage | undefined = await verify(
          this.#document.embedJpg.bind(undefined, asset.bytes)
        );
        if (picture === undefined) continue;
        pictures.push({
          picture,
          type: 'image',
        });
      } else if (asset.type === 'png') {
        const picture: PDFImage | undefined = await verify(
          this.#document.embedPng.bind(undefined, asset.bytes)
        );
        if (picture === undefined) continue;
        pictures.push({
          picture,
          type: 'image',
        });
      } else if (asset.type === 'pdf') {
        const srcPages: PDFPage[] | undefined = await verify(
          this.#getPdfPages.bind(undefined, asset.bytes)
        );
        if (srcPages === undefined) continue;
        const embeddedPages: PDFEmbeddedPicture[] = await Promise.all(
          srcPages.map(async (page) => {
            return {
              picture: await this.#document.embedPage(page),
              type: 'page',
            };
          })
        );
        embeddedPages.forEach((page) => pictures.push(page));
      } else console.error('Wrong Extension');
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

// FIXME: Source Map does not work
