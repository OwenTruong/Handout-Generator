import { PDFPage } from 'pdf-lib';
export declare class LineC {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    constructor({ x1, x2, y1, y2, }: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    });
    draw(page: PDFPage): void;
}
//# sourceMappingURL=LineC.d.ts.map