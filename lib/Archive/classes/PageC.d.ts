import { TextC } from 'Archive/classes/TextC';
import { TextFieldC } from 'Archive/classes/TextFieldC';
import { PictureC } from 'Archive/classes/PictureC';
import { LineC } from 'Archive/classes/LineC';
export declare class PageC {
    pageN: TextC | null;
    lines: LineC[];
    pictures: PictureC[];
    fields: TextFieldC[];
    dim: [number, number];
    constructor(page: any);
}
//# sourceMappingURL=PageC.d.ts.map