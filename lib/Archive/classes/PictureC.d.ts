import { PDFPage } from 'pdf-lib';
import { PDFEmbeddedPicture } from '@/others/types';
export declare class PictureC {
    #private;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor({ x, y, width, height, }: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    draw(dstPage: PDFPage, pic: PDFEmbeddedPicture): Promise<void>;
}
//# sourceMappingURL=PictureC.d.ts.map