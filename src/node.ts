import * as R from 'ramda';

import { defaults } from '@defaults/defaults';
import { PDF } from '@/PDF';

import { parseArgs, ArgsT } from './ParseArgumentModule/parseArgs';

// Unpure function
function pickTemplate(id: number, dfTemp: any[], i: number = 0): any {
  if (i == dfTemp.length) throw new Error('Template Not Found');
  if (id == dfTemp[i].id) return dfTemp[i];

  return pickTemplate(id, dfTemp, ++i);
}

// FIXME: It might not be a good idea for templates to be of type any
// TODO: Allow pdf as input
// Unpure function
async function getPDF(dstPDF: string, imgsPath: string, id: number) {
  // Dynamically pick image folder
  const pdf = new PDF();
  await pdf.init(pickTemplate(id, Object.values(defaults)));
  await pdf.createPDF(dstPDF, imgsPath);
  await pdf.writePDF(dstPDF ?? 'handout.pdf');
}

(() => {
  const data: ArgsT = parseArgs(process.argv);
  getPDF(data.output, data.input, data.id);
})();

// Pure: (input) => 3 * input
// Impure: (input: number) => print(3 * input)

// input = "foo"
// Impure: const owen = "smart";
// (input: "string") => owen + input
