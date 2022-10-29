import * as R from "ramda";


import { d3_print_portrait, testD } from "./modules/defaults";
import { PDF } from "./modules/PDF";

async function test(dstPDF: string, imgsPath: string) {
  // Dynamically pick image folder
  const pdf = new PDF();
  await pdf.init(d3_print_portrait);
  await pdf.createPDF(dstPDF, imgsPath);
  await pdf.writePDF('./test.pdf');
}

test('./test.pdf', './imgs');


