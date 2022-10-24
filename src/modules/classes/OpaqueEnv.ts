import fs from 'fs';


// create node and browser versions of each method
export class OpaqueEnv {
  static writeFile(path: string, bytes: Uint8Array): void {
    if (typeof window != undefined) fs.writeFileSync('./test', bytes);
  }

  static readFile(path: string): Buffer | null {
    if (typeof window != undefined) return fs.readFileSync(path);
    return null;
  }
}