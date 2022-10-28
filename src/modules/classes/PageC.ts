import { ImageC } from "@/classes/ImageC";
import { LineC } from "@/classes/LineC";

export class PageC {
  lines: LineC[];
  images: ImageC[];

  // Input is a page object (it is unknown if it has all of the properties of PageC)
  constructor(page: any) {
    try {
      this.lines = page.lines.map((line: any) => new LineC(line));
      this.images = page.images.map((image: any) => new ImageC(image));
    } catch(error) {
      // TODO: Check how code handles error
      throw new Error("\nPageC encountered an error\n\n" + error);
    }

  }
}