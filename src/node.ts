import * as R from 'ramda';

import { defaults } from '@defaults/defaults';
import { PDF } from '@/PDF';

import { parseArgs, ArgsT } from './ParseArgumentModule/parseArgs';

// Unpure function
function pickTemplate(template: number, dfTemp: any[], i: number = 0): any {
  if (dfTemp.length == i) throw new Error('Template Not Found');

  if (template == dfTemp[0].id) return dfTemp[i];

  pickTemplate(template, dfTemp, ++i);
}

// FIXME: It might not be a good idea for templates to be of type any
// FIXME: I hate how dirty my node.ts look
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
  const data: ArgsT = parseArgs(process.argv);
  getPDF(data.pdfPath, data.imgPath, data.template);
})();

// Pure: (input) => 3 * input
// Impure: (input: number) => print(3 * input)

// input = "foo"
// Impure: const owen = "smart";
// (input: "string") => owen + input
