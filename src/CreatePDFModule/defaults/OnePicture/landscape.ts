import { lWidth, lHeight } from '@/others/constants';
import { createPicture } from '@defaults/functions';
import { pic_width, pic_height } from '@defaults/OnePicture/onePicture';

const linepicSpace = 30;

const pic_x = (lWidth - pic_width) / 2;
const pic_y1 = lHeight - 50 - pic_height;
const pic_y2 = pic_y1 - (pic_height + linepicSpace) - pic_height / 2 - 10;

// const ln_x1 = pic_x;
// const ln_x2 = pic_x + pic_width;
// const ln_y = pic_y2 - 45;

export const d1_nothing_landscape: Template = {
  id: 13,
  name: 'Default 1 Nothing Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [lWidth, lHeight],

      fields: [],
      pictures: [createPicture(pic_x, pic_y1, pic_width, pic_height)],
      lines: [],
    },
  ],
};

// export const d1_print_landscape = {
//   id: 14,
//   name: 'Default 1 Print Landscape',

//   pages: [
//     {
//       pageN: {
//         x: lWidth - 50,
//         y: 30,
//         size: 12,
//       },
//       dim: [lWidth, lHeight],

//       lines: [...createLineBlock(ln_x1, ln_x2, ln_y, ln_y, 10)],

//       pictures: [createPicture(pic_x, pic_y1, pic_width, pic_height)],
//     },
//   ],
// };

// export const d1_digital_landscape = {
//   id: 15,
//   name: 'Default 1 Digital Landscape',

//   pages: [
//     {
//       pageN: {
//         x: lWidth - 50,
//         y: 30,
//         size: 12,
//       },
//       dim: [lWidth, lHeight],

//       fields: [createField(pic_x, ln_y, pic_width, pic_height)],

//       pictures: [createPicture(pic_x, pic_y1, pic_width, pic_height)],
//     },
//   ],
// };
