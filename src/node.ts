import * as R from 'ramda';

import { defaults } from '@defaults/defaults';
import { PDF } from '@/PDF';

// Unpure function
function pickTemplate(template: number, dfTemp: any[], i: number = 0): any {
  if (dfTemp.length == i) throw new Error('Template Not Found');

  if (template == dfTemp[0].id) return dfTemp[i];

  pickTemplate(template, dfTemp, ++i);
}

function splitArgs(array: string[]): string[][] {
  /* 
    return [ 
      [ 'flag1', 'arg1', 'arg2', ... ], 
      [ 'flag2', 'arg1', 'arg2', ...],
      ...
    ]
   */

  const helper = (arr: string[]): string[][] => {
    if (arr.length <= 0) return [[]];

    const result: string[][] = helper(arr.slice(1));

    if (arr[0][0] != '-' || array.length == arr.length)
      return [[arr[0], ...result[0]], ...result.slice(1)];
    else return [[], [arr[0], ...result[0]], ...result.slice(1)];
  };

  const result = helper(array);

  if (result[0][0][0] != '-') return result.slice(1);
  return result;
}

// Unpure function
function parseArgs() {
  const args: string[] = process.argv.slice(2);
  const flagArgs: string[][] = args.length == 0 ? [] : splitArgs(args);

  // mutated obj
  const obj = {
    pdfPath: '.',
    imgPath: '.',
    // TODO: Maybe change defFormat to accept user input in the future, and to make defFormat take in numbers instead of strings (each number is an id to a default format)
    template: 30,
  };

  for (let i = 0; i < flagArgs.length; i++) {
    const flagArg = flagArgs[i];

    if (flagArg.length != 2) throw new Error('Not enough arguments for flag');

    if (flagArg[0] == '-d') obj.pdfPath = flagArg[1];
    if (flagArg[0] == '-i') obj.imgPath = flagArg[1];
    if (flagArg[0] == '-df')
      obj.template = Number(flagArg[1]) == NaN ? 30 : Number(flagArg[1]);
  }

  return obj;
}

// FIXME: It might not be a good idea for templates to be of type any
// Unpure function
async function getPDF(dstPDF: string, imgsPath: string, template: number) {
  // Dynamically pick image folder
  const pdf = new PDF();
  await pdf.init(pickTemplate(template, Object.values(defaults)));
  // await pdf.init(defaults.d3_print_landscape);
  await pdf.createPDF(dstPDF, imgsPath);
  await pdf.writePDF('./test.pdf');
}

(() => {
  const data = parseArgs();

  getPDF(data.pdfPath, data.imgPath, data.template);
})();
