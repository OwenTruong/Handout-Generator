import { readdirSync } from 'fs';

const checkEquality = function(exts: string[]) {
  return (str: string) => {
    for (let i = 0; i < exts.length; ++i) {
      if (str.slice(-4) == '.' + exts[i]) return true;
    }
  }
}

// Uses fs to check if a certain file extension exists in a folder.
// Returns a string[] of path to files
export function getFilePaths(path: string) {
  if (path[-1] != '/') path = path + '/';
  return (extensions: string[]): string[] => 
    readdirSync(path)
      .filter(checkEquality(extensions))
      .map((name: string) => path + name);
}
