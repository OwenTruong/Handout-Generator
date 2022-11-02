// Potrait { width: 595.28, height: 841.89 }
// Landscape { width: 841.89, height: 595.28 }

import { pWidth, pHeight, lWidth, lHeight } from "@/constants/constants";

// Top Level //

const d3_img_width = 240;
const d3_img_height = 180;


// Template 3-Image Print Portrait //

const d3pp_img_x = 30;

const d3pp_img1_y = 80;
const d3pp_img2_y = d3pp_img1_y + (d3_img_height + 71);
const d3pp_img3_y = d3pp_img1_y + (d3_img_height + 71) + (d3_img_height + 71);

const d3pp_ln_x1 = 300;
const d3pp_ln_x2 = 560;

const d3pp_l1_y = d3pp_img1_y + 3;
const d3pp_l2_y = d3pp_img2_y + 3;
const d3pp_l3_y = d3pp_img3_y + 3;




// Template 3-Image Print Landscape //

const d3pl_img1_x = 30;
const d3pl_img2_x = 30 + d3_img_width + 30;
const d3pl_img3_x = 30 + d3_img_width + 30 + d3_img_width + 30;

const d3pl_img_y = lHeight - 30 - d3_img_height;

const d3pl_l1_x1 = d3pl_img1_x;
const d3pl_l2_x1 = d3pl_img2_x;
const d3pl_l3_x1 = d3pl_img3_x;

const d3pl_l1_x2 = d3pl_img1_x + d3_img_width;
const d3pl_l2_x2 = d3pl_img2_x + d3_img_width;
const d3pl_l3_x2 = d3pl_img3_x + d3_img_width;

const d3pl_ln_y = d3pl_img_y - 60;


// TODO: Create other templates
// TODO: Create TextfieldC

// Potrait / Landscape
// Print / Computer

// Image size should stay the same for the 4 versions: Potrait-Print, Potrait-Computer, Landscape-Print, Landscape-Computer

// I believe what I need to do is to create a print-version so that I have an idea of what I need to do for computer version.



// There is only going to be 1 page templates for defaults
// Images have the same size in a template
// Components include images, lines, textfields, text and page number


function createLine(x1: number, x2: number, y1: number, y2: number) {
  return { x1, x2, y1, y2 };
}


function createLineBlock(x1: number, x2: number, y1: number, y2: number) {
  const arr = [];
  const spacing = 30;
  for (let i = 0; i < 6; i++) 
    arr.push(createLine(x1, x2, y1 + spacing*i, y2 + spacing*i));
  
  return arr;
}

function createImage(x: number, y: number, width: number, height: number) {
  return { x, y, width, height };
}



export const d3_print_portrait = {
  "name": "Default 3 Portrait Print",

  "pages": [
    {
      "pageN": {
        "x": lWidth - 50,
        "y": 30,
        "size": 12
      },
      "dim": [ pWidth, pHeight],
      "lines": [
        ...createLineBlock(d3pp_ln_x1, d3pp_ln_x2, d3pp_l1_y, d3pp_l1_y),
        ...createLineBlock(d3pp_ln_x1, d3pp_ln_x2, d3pp_l2_y, d3pp_l2_y),
        ...createLineBlock(d3pp_ln_x1, d3pp_ln_x2, d3pp_l3_y, d3pp_l3_y),
      ],

      "images": [
        createImage(d3pp_img_x, d3pp_img1_y, d3_img_width, d3_img_height),
        createImage(d3pp_img_x, d3pp_img2_y, d3_img_width, d3_img_height),
        createImage(d3pp_img_x, d3pp_img3_y, d3_img_width, d3_img_height),
      ],
    }
  ]
}

export const d3_print_landscape = {
  "name": "Default 3 Portrait Print",

  "pages": [
    {
      "pageN": {
        "x": lWidth - 50,
        "y": 30,
        "size": 12
      },

      "dim": [ lWidth, lHeight ],

      "lines": [
        ...createLineBlock(d3pl_l1_x1, d3pl_l1_x2, d3pl_ln_y, d3pl_ln_y),
        ...createLineBlock(d3pl_l2_x1, d3pl_l2_x2, d3pl_ln_y, d3pl_ln_y),
        ...createLineBlock(d3pl_l3_x1, d3pl_l3_x2, d3pl_ln_y, d3pl_ln_y),
      ],

      "images": [
        createImage(d3pl_img1_x, d3pl_img_y, d3_img_width, d3_img_height),
        createImage(d3pl_img2_x, d3pl_img_y, d3_img_width, d3_img_height),
        createImage(d3pl_img3_x, d3pl_img_y, d3_img_width, d3_img_height),
      ],
    }
  ]
}






/* FOR REFERENCE */

// export const d3_print_portrait = {
//   "name": "Default 3 Portrait Print",

//   "pages": [
//     {
//       "pageN": {
//         "x": 550,
//         "y": 30,
//         "size": 12
//       },
//       "lines": [
//         /* First Image */
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l1_y,
//           "y2": d3pp_l1_y
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l1_y + 30,
//           "y2": d3pp_l1_y + 30
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l1_y + 60,
//           "y2": d3pp_l1_y + 60
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l1_y + 90,
//           "y2": d3pp_l1_y + 90
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l1_y + 120,
//           "y2": d3pp_l1_y + 120
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l1_y + 150,
//           "y2": d3pp_l1_y + 150,
//         },

//         /* Second Image */
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l2_y,
//           "y2": d3pp_l2_y
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l2_y + 30,
//           "y2": d3pp_l2_y + 30
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l2_y + 60,
//           "y2": d3pp_l2_y + 60
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l2_y + 90,
//           "y2": d3pp_l2_y + 90
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l2_y + 120,
//           "y2": d3pp_l2_y + 120
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l2_y + 150,
//           "y2": d3pp_l2_y + 150,
//         },

//         /* Third Image */
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l3_y,
//           "y2": d3pp_l3_y
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l3_y + 30,
//           "y2": d3pp_l3_y + 30
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l3_y + 60,
//           "y2": d3pp_l3_y + 60
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l3_y + 90,
//           "y2": d3pp_l3_y + 90
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l3_y + 120,
//           "y2": d3pp_l3_y + 120
//         },
//         {
//           "x1": 300,
//           "x2": 560,
//           "y1": d3pp_l3_y + 150,
//           "y2": d3pp_l3_y + 150,
//         },
//       ],

//       "images": [
//         {
//           "x": 30,
//           "y": 582,
//           "width": 240,
//           "height": 180
//         },
//         { // [(y1 - [y3 + height]) / 2] + [y3 + height]
//           // (y1)/2 + [y3 + height]/2 = [y1 + y3 + height] / 2
//           "x": 30,
//           "y": 331,
//           "width": 240,
//           "height": 180
//         },
//         {
//           "x": 30,
//           "y": 80,
//           "width": 240,
//           "height": 180
//         }
//       ],
//     }
//   ]
// }
