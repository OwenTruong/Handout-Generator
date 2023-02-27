#!/usr/bin/env node

import { parseArguments } from './ParseArguments/parseArguments';
import { Asset, TemplateRepo, Handout } from '@/Handout';
import fs from 'fs';
import { join, extname } from 'path';

const ACCEPTED_EXT = ['pdf', 'png', 'jpg', 'jpeg'];

/**
 * A  function, where given the path to a directory, will return an array of file paths with the accepted extensions
 * @param dirPath A file path string
 */
function getFilePaths(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath)
    .filter((filename) => ACCEPTED_EXT.includes(extname(filename).slice(1)))
    .map((filename: string) => join(dirPath, filename));
}

/**
 * A function, where given an array of paths to files, will return an array of type Asset, or an object that stores the bytes of a file and the extension that follows that file.
 * @param filePaths An array of the assets' file path
 */
function getAssets(filePaths: string[]): Asset[] {
  return filePaths.map((filePath): Asset => {
    const ext = extname(filePath).slice(1);
    const buffer: Buffer = fs.readFileSync(filePath);

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
  const handoutBytes = await new Handout().createHandout(assets, id, repo);
  fs.writeFileSync(handoutPath, handoutBytes);
}

/* 
Note: Wait... how about we assign each template a specific human-readable code name instead? Because we planned on allowing users to import their templates from cloud and we could have them assign specific code names to their templates too! Something like this: node main.js -default ThreeTom and node main.js -online Favorite1

Example: node main.js -i src_path -o dst_path -default ThreeTom -online Favorite1 (can't have default and online at the same time)
*/

(() => {
  const args: Record<string, string[]> = parseArguments(process.argv);

  const outputPath: string | undefined = args['-o']?.[0];
  const inputPath: string | undefined = args['-i']?.[0];
  const templateCode: string | undefined =
    args['-default']?.[0] || args['-online']?.[0];
  const repo: TemplateRepo | undefined = args['-default']
    ? 'default'
    : args['-online']
    ? 'online'
    : undefined;

  if (inputPath === undefined)
    throw new Error('Path of source image or pdf must be specified.');

  if (repo === undefined || templateCode === undefined) {
    throw new Error('Template repository and code name must be specified.');
  }

  getHandout(inputPath, outputPath ?? './handout.pdf', templateCode, repo);
})();
