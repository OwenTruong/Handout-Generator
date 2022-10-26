import { TemplateT } from "@/types/TemplateT";
import { LineT } from "@/types/LineT";
import { ImageT } from "@/types/ImageT";

// LineC and ImageC are not allowed to import TemplateC



// My purpose of using types and classes 
// export class TemplateC implements TemplateT {
//   name: string;
//   pages: {
//     lines: LineT[];
//     images: ImageT[];
//   }[];

//   constructor(obj: any) {
//     try {
//       this.name = obj.name;

//       const pages
//       for (let i = 0; i < obj.pages.length; i++) {
//         const page = obj.pages[i];

//       }
//     } catch(err) {
//       throw new Error("Invalid Template");
//     }
//   }

// }