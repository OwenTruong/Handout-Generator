const pWidth = 595.28;
const pHeight = 841.89;
const lWidth = 841.89;
const lHeight = 595.28;

const d3_img_width = 240;
const d3_img_height = 180;


const d3pp_l1_y = 582 + 3;
const d3pp_l2_y = 331 + 3;
const d3pp_l3_y = 80 + 3;



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

// Potrait { width: 595.28, height: 841.89 }
// Landscape { width: 841.89, height: 595.28 }


// TODO: Create other templates

// TODO: Create TextfieldC

// Potrait / Landscape
// Print / Computer

// Image size should stay the same for the 4 versions: Potrait-Print, Potrait-Computer, Landscape-Print, Landscape-Computer

// I believe what I need to do is to create a print-version so that I have an idea of what I need to do for computer version.



// There is only going to be 1 page templates for defaults
// Images have the same size in a template
// Components include images, lines, textfields, text and page number




export const d3_print_portrait = {
  "name": "Default 3 Portrait Print",

  "pages": [
    {
      "pageN": {
        "x": 550,
        "y": 30,
        "size": 12
      },
      "lines": [
        /* First Image */
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l1_y,
          "y2": d3pp_l1_y
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l1_y + 30,
          "y2": d3pp_l1_y + 30
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l1_y + 60,
          "y2": d3pp_l1_y + 60
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l1_y + 90,
          "y2": d3pp_l1_y + 90
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l1_y + 120,
          "y2": d3pp_l1_y + 120
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l1_y + 150,
          "y2": d3pp_l1_y + 150,
        },

        /* Second Image */
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l2_y,
          "y2": d3pp_l2_y
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l2_y + 30,
          "y2": d3pp_l2_y + 30
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l2_y + 60,
          "y2": d3pp_l2_y + 60
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l2_y + 90,
          "y2": d3pp_l2_y + 90
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l2_y + 120,
          "y2": d3pp_l2_y + 120
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l2_y + 150,
          "y2": d3pp_l2_y + 150,
        },

        /* Third Image */
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l3_y,
          "y2": d3pp_l3_y
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l3_y + 30,
          "y2": d3pp_l3_y + 30
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l3_y + 60,
          "y2": d3pp_l3_y + 60
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l3_y + 90,
          "y2": d3pp_l3_y + 90
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l3_y + 120,
          "y2": d3pp_l3_y + 120
        },
        {
          "x1": 300,
          "x2": 560,
          "y1": d3pp_l3_y + 150,
          "y2": d3pp_l3_y + 150,
        },
      ],

      "images": [
        {
          "x": 30,
          "y": 582,
          "width": 240,
          "height": 180
        },
        { // [(y1 - [y3 + height]) / 2] + [y3 + height]
          // (y1)/2 + [y3 + height]/2 = [y1 + y3 + height] / 2
          "x": 30,
          "y": 331,
          "width": 240,
          "height": 180
        },
        {
          "x": 30,
          "y": 80,
          "width": 240,
          "height": 180
        }
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
      "lines": [
        // First Image //
        {
          "x1": d3pl_l1_x1,
          "x2": d3pl_l1_x2,
          "y1": d3pl_ln_y,
          "y2": d3pl_ln_y
        },
        {
          "x1": d3pl_l1_x1,
          "x2": d3pl_l1_x2,
          "y1": d3pl_ln_y + 30,
          "y2": d3pl_ln_y + 30
        },
        {
          "x1": d3pl_l1_x1,
          "x2": d3pl_l1_x2,
          "y1": d3pl_ln_y + 60,
          "y2": d3pl_ln_y + 60
        },
        {
          "x1": d3pl_l1_x1,
          "x2": d3pl_l1_x2,
          "y1": d3pl_ln_y + 90,
          "y2": d3pl_ln_y + 90
        },
        {
          "x1": d3pl_l1_x1,
          "x2": d3pl_l1_x2,
          "y1": d3pl_ln_y + 120,
          "y2": d3pl_ln_y + 120
        },
        {
          "x1": d3pl_l1_x1,
          "x2": d3pl_l1_x2,
          "y1": d3pl_ln_y + 150,
          "y2": d3pl_ln_y + 150
        },

        // Second Image //

        {
          "x1": d3pl_l2_x1,
          "x2": d3pl_l2_x2,
          "y1": d3pl_ln_y,
          "y2": d3pl_ln_y
        },
        {
          "x1": d3pl_l2_x1,
          "x2": d3pl_l2_x2,
          "y1": d3pl_ln_y + 30,
          "y2": d3pl_ln_y + 30
        },
        {
          "x1": d3pl_l2_x1,
          "x2": d3pl_l2_x2,
          "y1": d3pl_ln_y + 60,
          "y2": d3pl_ln_y + 60
        },
        {
          "x1": d3pl_l2_x1,
          "x2": d3pl_l2_x2,
          "y1": d3pl_ln_y + 90,
          "y2": d3pl_ln_y + 90
        },
        {
          "x1": d3pl_l2_x1,
          "x2": d3pl_l2_x2,
          "y1": d3pl_ln_y + 120,
          "y2": d3pl_ln_y + 120
        },
        {
          "x1": d3pl_l2_x1,
          "x2": d3pl_l2_x2,
          "y1": d3pl_ln_y + 150,
          "y2": d3pl_ln_y + 150
        },

        // Third Image //

        {
          "x1": d3pl_l3_x1,
          "x2": d3pl_l3_x2,
          "y1": d3pl_ln_y,
          "y2": d3pl_ln_y
        },
        {
          "x1": d3pl_l3_x1,
          "x2": d3pl_l3_x2,
          "y1": d3pl_ln_y + 30,
          "y2": d3pl_ln_y + 30
        },
        {
          "x1": d3pl_l3_x1,
          "x2": d3pl_l3_x2,
          "y1": d3pl_ln_y + 60,
          "y2": d3pl_ln_y + 60
        },
        {
          "x1": d3pl_l3_x1,
          "x2": d3pl_l3_x2,
          "y1": d3pl_ln_y + 90,
          "y2": d3pl_ln_y + 90
        },
        {
          "x1": d3pl_l3_x1,
          "x2": d3pl_l3_x2,
          "y1": d3pl_ln_y + 120,
          "y2": d3pl_ln_y + 120
        },
        {
          "x1": d3pl_l3_x1,
          "x2": d3pl_l3_x2,
          "y1": d3pl_ln_y + 150,
          "y2": d3pl_ln_y + 150
        },
      ],

      "images": [
        {
          "x": d3pl_img1_x,
          "y": d3pl_img_y,
          "width": d3_img_width,
          "height": d3_img_height
        },
        {
          "x": d3pl_img2_x,
          "y": d3pl_img_y,
          "width": d3_img_width,
          "height": d3_img_height
        },
        {
          "x": d3pl_img3_x,
          "y": d3pl_img_y,
          "width": d3_img_width,
          "height": d3_img_height
        },
      ],
    }
  ]
}


export const testD = {
  "name": "test",

  "pages": [
    {
      "lines": [
        {
          "x1": 300,
          "y1": 200,
          "x2": 400,
          "y2": '200',
        },
        {
          "x1": 300,
          "y1": 300,
          "x2": 400,
          "y2": 300
        },
        {
          "x1": 300,
          "y1": 400,
          "x2": 400,
          "y2": 400
        }
      ],

      "images": [
        {
          "x": 50,
          "y": 582,
          "width": 240,
          "height": 180
        },
        {
          "x": 50,
          "y": 331,
          "width": 240,
          "height": 180
        },
        {
          "x": 50,
          "y": 80,
          "width": 240,
          "height": 180
        }
      ],
    },
    {
      "lines": [],

      "images": [
        {
          "x": 300,
          "y": 582,
          "width": 240,
          "height": 180
        },
        {
          "x": 300,
          "y": 331,
          "width": 240,
          "height": 180
        },
        {
          "x": 300,
          "y": 80,
          "width": 240,
          "height": 180
        }
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
