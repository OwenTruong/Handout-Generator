/// <reference types="node" />
export declare class OpaqueEnv {
    static writeFile(path: string, bytes: Uint8Array): void;
    static readFile(path: string): Buffer | null;
    static getFilePaths(path: string): (extensions: string[]) => string[];
}
//# sourceMappingURL=OpaqueEnv.d.ts.map