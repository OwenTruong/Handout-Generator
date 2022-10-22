import { readdirSync } from 'fs';

const checkEquality = function(exts: string[]) {
  return (str: string) => {
    for (let i = 0; i < exts.length; ++i) {
      if (str.slice(-4) == '.' + exts[i]) return true;
    }
  }
}

// Uses fs to check if a certain file extension exists in a folder.
// Returns a string[] of path to the files
export function findFiles(path: string) {
  return (extensions: string[]): string[] => readdirSync(path).filter(checkEquality(extensions));
}
