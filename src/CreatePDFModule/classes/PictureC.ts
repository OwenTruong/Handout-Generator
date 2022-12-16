import { PDFDocument, PDFPage, PDFImage, PDFEmbeddedPage } from 'pdf-lib';

import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';
import { PDFEmbeddedPicture } from '@/others/types';

export class PictureC {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    if (
      !checkData(x, y, width, height) ||
      !checkType([x, y, width, height], Array(4).fill('number'))
    )
      throw new Error('ImageC Constructor Argument is Invalid');

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // A method that grabs bytes of an image with fs and add it to a page in a pdf
  // draw belongs in ImageC.prototype
  async #drawImage(page: PDFPage, image: PDFImage): Promise<void> {
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    page.drawImage(image, options);
  }

  async #drawPage(dstPage: PDFPage, srcPage: PDFEmbeddedPage) {
    const options = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    dstPage.drawPage(srcPage, options);
  }

  async draw(dstPage: PDFPage, pic: PDFEmbeddedPicture) {
    if (pic.type == 'pdf')
      this.#drawPage(dstPage, pic.picture as PDFEmbeddedPage);
    else this.#drawImage(dstPage, pic.picture as PDFImage);
  }
}
