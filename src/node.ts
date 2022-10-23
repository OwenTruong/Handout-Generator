import * as R from "ramda";

// TODO: Create Curry and Compose function

import fs from 'fs';

import { d3_print_portrait, testD } from "./modules/defaults";
import { PDF } from "./modules/PDF";


async function test(dstPDF: string, imgsPath: string) {
  // Dynamically pick image folder
  const pdf = new PDF();
  await pdf.init(testD);
  await pdf.createPDF(dstPDF, imgsPath);
  fs.writeFileSync('./test', await pdf.getPDFBytes());
}

test('./test.pdf', './imgs');