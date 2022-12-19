import { parseArgs, ArgsT } from './ParseArgumentModule/parseArgs';
import { Asset, Handout } from '@/Handout';
import fs from 'fs';

function checkEquality(exts: string[]): (str: string) => boolean {
  return (str: string) => {
    for (let i = 0; i < exts.length; ++i) {
      if (str.slice(-4) == '.' + exts[i]) return true;
    }
    return false;
  };
}

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

function getAssets(paths: string[]) {
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

async function getHandout(
  pdfPath: string = 'handout.pdf',
  picturePath: string,
  id: number = 30
) {
  const assets = getAssets(getFilePaths(picturePath)(['pdf', 'png', 'jpg']));
  const handout = new Handout();

  const handoutBytes = await handout.createHandout(assets, id);
  fs.writeFileSync(pdfPath, handoutBytes);
}

(() => {
  const data: ArgsT = parseArgs(process.argv);
  getHandout(data.output, data.input, +data.id);
})();
