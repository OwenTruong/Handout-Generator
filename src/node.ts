import * as R from "ramda";


import { d3_print_portrait, testD } from "./modules/defaults";
import { PDF } from "./modules/PDF";

import { LineT } from "@/types/LineT"


// async function test(dstPDF: string, imgsPath: string) {
//   // Dynamically pick image folder
//   const pdf = new PDF();
//   await pdf.init(testD);
//   await pdf.createPDF(dstPDF, imgsPath);
//   await pdf.writePDF('./test.pdf');
// }

// test('./test.pdf', './imgs');


// TODO: replace class fields with their type as a field
// TODO: Figure out how I can convert an object with missing properties from a type, into that type.
// const line: LineT = {
//   ...testD.pages[0].lines[0]
// };
// integrityCheck(line);
