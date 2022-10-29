// LineC and ImageC are not allowed to import TemplateC

import { PageC } from "@/classes/PageC";
import { checkData } from "@/functions/checkData";



// My purpose of using types and classes 
export class TemplateC {
  name: string;
  pages: PageC[];

  constructor(obj: any) {
    if (!checkData(obj.name, obj.pages)) throw new Error('TemplateC Constructor Argument is Invalid');
    this.name = obj.name;
    this.pages = obj.pages.map((page: any) => new PageC(page));
  }

}