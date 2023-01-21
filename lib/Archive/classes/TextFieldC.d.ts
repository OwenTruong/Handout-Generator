import { PDFDocument, PDFPage } from 'pdf-lib';
export declare class TextFieldC {
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
    draw(pdfDoc: PDFDocument, page: PDFPage): Promise<void>;
}
//# sourceMappingURL=TextFieldC.d.ts.map