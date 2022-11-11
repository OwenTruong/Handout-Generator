import fs from 'fs';

const checkEquality = function (exts: string[]) {
  return (str: string) => {
    for (let i = 0; i < exts.length; ++i) {
      if (str.slice(-4) == '.' + exts[i]) return true;
    }
  };
};

// create node and browser versions of each method
export class OpaqueEnv {
  static writeFile(path: string, bytes: Uint8Array): void {
    if (typeof window === 'undefined') fs.writeFileSync(path, bytes);
  }

  static readFile(path: string): Buffer | null {
    if (typeof window === 'undefined') return fs.readFileSync(path);
    else return null;
  }

  // Uses fs to check if a certain file extension exists in a folder.
  // Returns a string[] of path to files
  static getFilePaths(path: string) {
    if (path[-1] != '/') path = path + '/';

    return (extensions: string[]): string[] => {
      if (typeof window === 'undefined') {
        const result: string[] = fs
          .readdirSync(path)
          .filter(checkEquality(extensions))
          .map((name: string) => path + name);

        return result;
      }

      return [];
    };
  }
}
