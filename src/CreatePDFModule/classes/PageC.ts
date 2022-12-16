import { TextC } from '@classes/TextC';
import { TextFieldC } from '@/classes/TextFieldC';
import { PictureC } from '@/classes/PictureC';
import { LineC } from '@classes/LineC';

import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

export class PageC {
  pageN: TextC | null;
  lines: LineC[];
  pictures: PictureC[];

  fields: TextFieldC[];
  dim: [number, number];

  // Input is a page object (it is unknown if it has all of the properties of PageC)
  constructor(page: any) {
    if (!checkType(page.dim[0], page.dim[1]))
      throw new Error('PageC Constructor: Dimension of page is incorrect');

    if (!checkData(page.dim)) throw new Error('Page Dimension not Given');

    // if (!checkData(page.pageN, page.lines, page.images, page.dim)) {
    //   page
    // }

    this.pageN = checkData(page.pageN) ? new TextC(page.pageN) : null;

    this.lines = checkData(page.lines)
      ? page.lines.map((line: any) => new LineC(line))
      : [];

    // FIXME: tight spot... how do I handle PngC, JpgC, SrcPdfC and future classes here?
    this.pictures = checkData(page.pictures)
      ? page.pictures.map((picture: any) => new ImageC(picture))
      : [];

    this.fields = checkData(page.fields)
      ? page.fields.map((field: any) => new TextFieldC(field))
      : [];

    this.dim = page.dim;
  }
}
