import * as R from "ramda";


import * as Defaults from "./modules/defaults/defaults";
import { PDF } from "./modules/PDF";

async function test(dstPDF: string, imgsPath: string) {
  // Dynamically pick image folder
  // TODO: Have PDF function accept landscape
  // TODO: edit pdf.init or pdf.createPDF to enable a landscape page
  // TODO: Have PDF accept zero image, line or textfield
  const pdf = new PDF();
  await pdf.init(Defaults.d3_print_portrait);
  // await pdf.init(Defaults.d3_print_landscape);
  await pdf.createPDF(dstPDF, imgsPath);
  await pdf.writePDF('./test.pdf');
}

test('./test.pdf', './imgs');


