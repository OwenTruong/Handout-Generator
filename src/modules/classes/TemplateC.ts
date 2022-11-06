// LineC and ImageC are not allowed to import TemplateC

import { PageC } from '@classes/PageC';
import { checkData } from '@functions/checkData';
import { checkType } from '@functions/checkType';

// My purpose of using types and classes
export class TemplateC {
  name: string;
  pages: PageC[];

  constructor(obj: any) {
    if (!checkType([obj.name], ['string']))
      throw new Error('TemplateC Argument Name Value is Invalid');

    this.name = checkData(obj.name) ? obj.name : '';
    this.pages = checkData(obj.pages)
      ? obj.pages.map((page: any) => new PageC(page))
      : [];
  }
}
