import { parseArguments } from './ParseArguments/parseArguments';
import { Asset, Handout } from '@/Handout';
import fs from 'fs';

/**
 * Given an unknown object, check if it contains a certain property.
 * @param obj Unknown
 * @returns boolean
 */
export function hasProperty(obj: unknown): (prop: string) => boolean {
  return (prop: string) =>
    typeof obj === 'object' && obj !== null && prop in obj;
}

/**
 *
 * @param obj
 * @returns
 */
export function checkType(obj: unknown): (type: string) => boolean {
  return (type: string) => typeof obj === type;
}

/**
 * A curried function that checks if a file's extension is equal to one of the target extension.
 * @param targetExtensions An array of target extensions that we wish to check a fileName string against.
 * @returns An anonymous arrow function that receives a fileName string and returns a boolean.
 */
function checkEquality(
  targetExtensions: string[]
): (fileName: string) => boolean {
  return (fileName: string) => {
    for (let i = 0; i < targetExtensions.length; ++i) {
      if (fileName.slice(-4) == '.' + targetExtensions[i]) return true;
    }
    return false;
  };
}

/**
 * A curried function, where given a path to a target folder, will return an array of file paths to the files inside the target folder.
 * @param path A file path string
 * @returns An anonymous arrow function that receives an array of extensions that we want to check the target folder string against, and returns an array of file paths to the files inside the target folder.
 */
function getFilePaths(path: string): (extensions: string[]) => string[] {
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

/**
 * A function, where given an array of paths to files, will return an array of type Asset, or an object that stores the bytes of a file and the extension that follows that file.
 * @param paths An array of the assets' file path
 * @returns An array of type Asset
 */
function getAssets(paths: string[]): Asset[] {
  const assets: Asset[] = [];

  for (const path of paths) {
    const ext = path.slice(-3);
    const buffer: Buffer = fs.readFileSync(path);

    if (ext == 'jpg' || ext == 'png' || ext == 'pdf')
      assets.push({ type: ext, bytes: buffer });
    else throw new Error('Wrong File in getAssets(paths: string[])');
  }

  return assets;
}

/**
 *  A function that uses fs operations to create a handout using Handout class.
 * @param handoutPath Destination file path for where we want to save and write the handout to.
 * @param picturePath Origin folder of where all of our assets (images and pdf that will be embedded into the handout) are stored.
 * @param id The ID of a default template handout
 */
async function getHandout(
  handoutPath: string = 'handout.pdf',
  picturePath: string,
  id: number = 30
): Promise<void> {
  const assets = getAssets(getFilePaths(picturePath)(['pdf', 'png', 'jpg']));
  const handout = new Handout();

  const handoutBytes = await handout.createHandout(assets, id);
  fs.writeFileSync(handoutPath, handoutBytes);
}

// TODO: Change -t template argument to something else because the ids are confusing.
// we could have 1 flag for each type
// or we could have a flag for a string that maps to each defaults
(() => {
  // properties: -d (string) -i (string) -t (+number)
  const data: {
    [k: string]: string[];
  } = parseArguments(process.argv);

  if (!('-o' in data) || typeof data['-o'][0] !== 'string')
    data['-o'] = ['handout.pdf'];
  if (!('-i' in data) || typeof data['-i'][0] !== 'string')
    throw new Error('input flag error');
  if (!('-t' in data) || typeof data['-t'][0] !== 'string')
    throw new Error('Template id flag error');

  const output: string = data['-o'][0];
  const input: string = data['-i'][0];
  const id: string = data['-t'][0];

  getHandout(output, input, +id);
})();
