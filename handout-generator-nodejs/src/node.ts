import { parseArguments } from './ParseArguments/parseArguments';
import { PublicAsset, PublicTemplateRepo, Handout } from '@/Handout';
import fs from 'fs';

/**
 * A curried function that checks if a file's extension is equal to one of the target extension.
 * @param targetExtensions An array of target extensions that we wish to check a fileName string against.
 */
function checkEquality(
  targetExtensions: string[]
): (fileName: string) => boolean {
  return (fileName: string) => {
    for (let i = 0; i < targetExtensions.length; ++i) {
      if (fileName.slice(-4) == targetExtensions[i]) return true;
    }
    return false;
  };
}

/**
 * A function where given the path to a file, it will return the extension of that file.
 * @param path The path to the file.
 */
function getExtension(path: string): string {
  const ext: RegExpMatchArray | null = path.match(/[^\.]*$/);
  if (ext === null) return '';
  return ext[0];
}

/**
 * A curried function, where given a path to a target folder, will return an array of file paths to the files inside the target folder.
 * @param path A file path string
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
 */
function getAssets(paths: string[]): PublicAsset[] {
  const assets: PublicAsset[] = [];

  for (const path of paths) {
    const ext = getExtension(path);
    const buffer: Buffer = fs.readFileSync(path);

    if (ext == 'pdf' || ext == 'png' || ext == 'jpg' || ext == 'jpeg')
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
  handoutPath: string = './handout.pdf',
  picturePath: string = '.',
  id: string = 'ThreeTraitLine',
  repo: PublicTemplateRepo = 'default'
): Promise<void> {
  const assets = getAssets(
    getFilePaths(picturePath)(['pdf', 'png', 'jpg', 'jpeg'])
  );
  const handout = new Handout();

  const handoutBytes = await handout.createHandout(assets, id, repo);
  fs.writeFileSync(handoutPath, handoutBytes);
}

// Wait... how about we assign each template a specific human-readable code name instead? Because we planned on allowing users to import their templates from cloud and we could have them assign specific code names to their templates too! Something like this: node main.js -default ThreeTom and node main.js -online Favorite1
// full example: node main.js -i src_path -o dst_path -default ThreeTom -online Favorite1 (can't have default and online at the same time)
(() => {
  // properties: -d (string) -i (string) -t (+number)
  const data: {
    [k: string]: string[];
  } = parseArguments(process.argv);

  // if (!('-o' in data) || typeof data['-o'][0] !== 'string')
  //   data['-o'] = ['handout.pdf'];
  // if (!('-i' in data) || typeof data['-i'][0] !== 'string')
  //   throw new Error('input flag error');
  // if (!('-t' in data) || typeof data['-t'][0] !== 'string')
  //   throw new Error('Template id flag error');

  const output: string | undefined = data['-o'] ? data['-o'][0] : undefined;
  const input: string | undefined = data['-i'] ? data['-i'][0] : undefined;

  const id: string | undefined = data['-default']
    ? data['-default'][0]
    : data['-online']
    ? data['-online'][0]
    : undefined;
  const repo: PublicTemplateRepo | undefined = data['-default']
    ? 'default'
    : data['-online']
    ? 'online'
    : undefined;

  getHandout(output, input, id, repo);
})();
