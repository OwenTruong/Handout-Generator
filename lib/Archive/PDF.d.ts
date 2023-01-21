/// <reference types="node" />
import { PDFPage } from 'pdf-lib';
export declare class PDF {
    #private;
    init(template: any): Promise<void>;
    writePDF(path: string): Promise<void>;
    static getPdfPages(pdfBuffer: Buffer): Promise<PDFPage[]>;
    createPDF(dstPath: string, imgsPath: string): Promise<void>;
}
//# sourceMappingURL=PDF.d.ts.map