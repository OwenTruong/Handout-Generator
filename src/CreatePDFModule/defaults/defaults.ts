import * as Portrait1 from '@defaults/Onepicture/portrait';
import * as Landscape1 from '@defaults/Onepicture/landscape';

import * as Portrait2 from '@defaults/Twopicture/portrait';
import * as Landscape2 from '@defaults/Twopicture/landscape';

import * as Portrait3 from '@defaults/Threepicture/portrait';
import * as Landscape3 from '@defaults/Threepicture/landscape';

import * as Portrait4 from '@defaults/Fourpicture/portrait';
import * as Landscape4 from '@defaults/Fourpicture/landscape';

export const defaults = Object.assign(
  {},

  Portrait1,
  Landscape1,

  Portrait2,
  Landscape2,

  Portrait3,
  Landscape3,

  Portrait4,
  Landscape4
);

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
//         /* First picture */
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

//         /* Second picture */
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

//         /* Third picture */
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

//       "pictures": [
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
