#!/usr/bin/env node

import { parseArguments } from './ParseArguments/parseArguments';
import { Asset, TemplateRepo, Handout } from '@/Handout';
import fs from 'fs';
import { join, extname } from 'path';

const ACCEPTED_EXT = ['pdf', 'png', 'jpg', 'jpeg'];

/**
 * A  function, where given the path to a target folder, will return an array of file paths with the accepted extensions
 * @param path A file path string
 */
function getFilePaths(path: string): string[] {
  return fs
    .readdirSync(path)
    .filter((filename) => ACCEPTED_EXT.includes(extname(filename).slice(1)))
    .map((name: string) => join(path, name));
}

/**
 * A function, where given an array of paths to files, will return an array of type Asset, or an object that stores the bytes of a file and the extension that follows that file.
 * @param paths An array of the assets' file path
 */
function getAssets(paths: string[]): Asset[] {
  return paths.map((path): Asset => {
    const ext = extname(path).slice(1);
    const buffer: Buffer = fs.readFileSync(path);

    if (ext == 'pdf' || ext == 'png' || ext == 'jpg' || ext == 'jpeg')
      return {
        type: ext,
        bytes: buffer,
      };
    else throw new Error('Wrong File in getAssets(paths: string[])');
  });
}

/**
 *  A function that uses fs operations to create a handout using Handout class.
 * @param handoutPath Destination file path for where we want to save and write the handout to.
 * @param picturePath Origin folder of where all of our assets (images and pdf that will be embedded into the handout) are stored.
 * @param id The ID of a default template handout
 */
async function getHandout(
  picturePath: string,
  handoutPath: string = './handout.pdf',
  id: string = 'ThreeTraitLine',
  repo: TemplateRepo = 'default'
): Promise<void> {
  const assets = getAssets(getFilePaths(picturePath));
  const handout = new Handout();

  const handoutBytes = await handout.createHandout(assets, id, repo);
  fs.writeFileSync(handoutPath, handoutBytes);
}

/* 
Note: Wait... how about we assign each template a specific human-readable code name instead? Because we planned on allowing users to import their templates from cloud and we could have them assign specific code names to their templates too! Something like this: node main.js -default ThreeTom and node main.js -online Favorite1

Example: node main.js -i src_path -o dst_path -default ThreeTom -online Favorite1 (can't have default and online at the same time)
*/

(() => {
  const data: {
    [k: string]: string[];
  } = parseArguments(process.argv);

  const output: string | undefined = data['-o'] ? data['-o'][0] : undefined;
  const input: string | undefined = data['-i'] ? data['-i'][0] : undefined;
  if (input === undefined)
    throw new Error('Path of source image or pdf must be specified.');

  // FIXME: hard to read id and repo, be more declarative
  const id: string | undefined = data['-default']
    ? data['-default'][0]
    : data['-online']
    ? data['-online'][0]
    : undefined;
  const repo: TemplateRepo | undefined = data['-default']
    ? 'default'
    : data['-online']
    ? 'online'
    : undefined;

  getHandout(input, output, id, repo);
})();
