import * as R from "ramda";

import { d3_print_portrait } from "./modules/defaults";
import { PDF } from "./modules/PDF";


async function test() {
  const pdf = new PDF();
  await pdf.init(d3_print_portrait);
  await pdf.createPDF('./test.pdf');
  await pdf.write('./test.pdf');
}

test();