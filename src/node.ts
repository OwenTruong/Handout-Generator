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

test('./test.pdf', './imgs');
