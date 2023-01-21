import { PDFDocument, PDFPage, RGB } from 'pdf-lib';
export declare class TextC {
    x: number;
    y: number;
    size: number;
    color: RGB;
    constructor({ x, y, size, color, }: {
        x: number;
        y: number;
        size: number;
        color: number[];
    });
    draw(pdfDoc: PDFDocument, page: PDFPage, message: string): Promise<void>;
}
//# sourceMappingURL=TextC.d.ts.map