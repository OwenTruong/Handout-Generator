import * as R from "ramda";


import * as Defaults from "./modules/defaults";
import { PDF } from "./modules/PDF";

async function test(dstPDF: string, imgsPath: string) {
  // Dynamically pick image folder
  // TODO: Have PDF function accept landscape
  const pdf = new PDF();
  await pdf.init(Defaults.d3_print_landscape);
  await pdf.createPDF(dstPDF, imgsPath);
  await pdf.writePDF('./test.pdf');
}

test('./test.pdf', './imgs');


