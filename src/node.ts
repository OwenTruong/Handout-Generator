import * as R from 'ramda';

import { defaults } from '@defaults/defaults';
import { PDF } from '@/PDF';

async function test(dstPDF: string, imgsPath: string) {
  // Dynamically pick image folder
  const pdf = new PDF();
  await pdf.init(defaults.d3_print_portrait);
  // await pdf.init(defaults.d3_print_landscape);
  await pdf.createPDF(dstPDF, imgsPath);
  await pdf.writePDF('./test.pdf');
}

function splitArgs(array: string[]): string[][] {
  /* 
    return [ 
      [ 'flag1', 'arg1', 'arg2', ... ], 
      [ 'flag2', 'arg1', 'arg2', ...],
      ...
    ]
   */
  // if arr[0] is a modifier, create a new array to store the flags and its arguments
  // else if arr[0] is an argument, create new array with arr[0] as argument

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

function parseArgs() {
  const args: string[] = process.argv.slice(2);
  const flagArgs: string[][] = splitArgs(args);

  // mutated obj
  const obj = {
    pdfPath: '.',
    imgPath: '.',
    // TODO: Maybe change defFormat to accept user input in the future, and to maek defFormat take in numbers instead of strings (each number is an id to a default format)
    defFormat: '3pp',
  };
  for (let i = 0; i < flagArgs.length; i++) {
    const flagArg = flagArgs[i];

    if (flagArg.length != 2) throw new Error('Not enough arguments for flag');

    if (flagArg[0] == '-d') obj.pdfPath = flagArg[1];
    if (flagArg[0] == '-i') obj.imgPath = flagArg[1];
    if (flagArg[0] == '-df') obj.defFormat = flagArg[1];
  }

  return obj;
}

parseArgs();

test('./test.pdf', './imgs');
