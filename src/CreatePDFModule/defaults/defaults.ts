import {
  d1_nothing_portrait,
  d1_print_portrait,
  d1_digital_portrait,
} from '@defaults/OnePicture/portrait';
import { d1_nothing_landscape } from '@defaults/OnePicture/landscape';

import { d2_nothing_portrait } from '@defaults/TwoPicture/portrait';
import {
  d2_print_landscape,
  d2_digital_landscape,
} from '@defaults/TwoPicture/landscape';

import {
  d3_print_portrait,
  d3_digital_portrait,
} from '@defaults/ThreePicture/portrait';
import {
  d3_print_landscape,
  d3_digital_landscape,
} from '@defaults/ThreePicture/landscape';

import { d4_print_portrait } from '@defaults/FourPicture/portrait';
import { d4_print_landscape } from '@defaults/FourPicture/landscape';

export const defaults = {
  d1_nothing_portrait,
  d1_print_portrait,
  d1_digital_portrait,

  d1_nothing_landscape,

  d2_nothing_portrait,
  d2_print_landscape,
  d2_digital_landscape,

  d3_print_portrait,
  d3_digital_portrait,
  d3_print_landscape,
  d3_digital_landscape,

  d4_print_portrait,
  d4_print_landscape,
};

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
