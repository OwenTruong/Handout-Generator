import { TextC } from "@/classes/TextC";
import { ImageC } from "@/classes/ImageC";
import { LineC } from "@/classes/LineC";

import { checkData } from "@/functions/checkData";

export class PageC {
  pageN: TextC;
  lines: LineC[];
  images: ImageC[];

  // Input is a page object (it is unknown if it has all of the properties of PageC)
  constructor(page: any) {
    if (!checkData(page.pageN, page.lines, page.images)) throw new Error('PageC Constructor Argument is Invalid');
    this.pageN = new TextC(page.pageN);
    this.lines = page.lines.map((line: any) => new LineC(line));
    this.images = page.images.map((image: any) => new ImageC(image));
  }
}