import { TextC } from "@/classes/TextC";
import { ImageC } from "@/classes/ImageC";
import { LineC } from "@/classes/LineC";

import { checkData } from "@/functions/checkData";
import { checkType } from "@/functions/checkType";

export class PageC {
  pageN: TextC;
  lines: LineC[];
  images: ImageC[];
  dim: [ number, number ];

  // Input is a page object (it is unknown if it has all of the properties of PageC)
  constructor(page: any) {
    if (!checkData(page.pageN, page.lines, page.images, page.dim)) 
      throw new Error('PageC Constructor Argument is Invalid');
    if (!checkType(page.dim[0], page.dim[1])) 
      throw new Error('PageC Constructor: Dimension of page is incorrect');

    this.pageN = new TextC(page.pageN);
    this.lines = page.lines.map((line: any) => new LineC(line));
    this.images = page.images.map((image: any) => new ImageC(image));
    this.dim = page.dim;
  }
}