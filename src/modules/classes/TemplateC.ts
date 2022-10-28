// LineC and ImageC are not allowed to import TemplateC

import { PageC } from "@/classes/PageC";



// My purpose of using types and classes 
export class TemplateC {
  name: string;
  pages: PageC[];

  constructor(obj: any) {
    try {
      this.name = obj.name;
      this.pages = obj.pages.map((page: any) => new PageC(page));
    } catch(error) {
      throw new Error("\nTemplateC encountered an error\n\n" + error);
    }
  }

}