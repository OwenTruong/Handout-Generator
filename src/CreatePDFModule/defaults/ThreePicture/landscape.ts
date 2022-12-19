import { lWidth, lHeight } from '@/others/constants';
import {
  createLineBlock,
  createPicture,
  createField,
} from '@defaults/functions';
import { pic_width, pic_height } from '@defaults/ThreePicture/threePicture';

const pic1_x = 30;
const pic2_x = 30 + pic_width + 30;
const pic3_x = 30 + pic_width + 30 + pic_width + 30;

const pic_y = lHeight - 100 - pic_height;

const l1_x1 = pic1_x;
const l2_x1 = pic2_x;
const l3_x1 = pic3_x;

const l1_x2 = pic1_x + pic_width;
const l2_x2 = pic2_x + pic_width;
const l3_x2 = pic3_x + pic_width;

const ln_y = pic_y - pic_height - 40;

export const d3_print_landscape: Template = {
  id: 32,
  name: 'Default 3 Print Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },

      dim: [lWidth, lHeight],

      fields: [],
      pictures: [
        createPicture(pic1_x, pic_y, pic_width, pic_height),
        createPicture(pic2_x, pic_y, pic_width, pic_height),
        createPicture(pic3_x, pic_y, pic_width, pic_height),
      ],

      lines: [
        ...createLineBlock(l1_x1, l1_x2, ln_y, ln_y),
        ...createLineBlock(l2_x1, l2_x2, ln_y, ln_y),
        ...createLineBlock(l3_x1, l3_x2, ln_y, ln_y),
      ],
    },
  ],
};

export const d3_digital_landscape: Template = {
  id: 33,
  name: 'Default 3 Print Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },

      dim: [lWidth, lHeight],

      // lines: [
      //   ...createLineBlock(l1_x1, l1_x2, ln_y, ln_y),
      //   ...createLineBlock(l2_x1, l2_x2, ln_y, ln_y),
      //   ...createLineBlock(l3_x1, l3_x2, ln_y, ln_y),
      // ],

      fields: [
        createField(pic1_x, ln_y, pic_width, pic_height),
        createField(pic2_x, ln_y, pic_width, pic_height),
        createField(pic3_x, ln_y, pic_width, pic_height),
      ],

      pictures: [
        createPicture(pic1_x, pic_y, pic_width, pic_height),
        createPicture(pic2_x, pic_y, pic_width, pic_height),
        createPicture(pic3_x, pic_y, pic_width, pic_height),
      ],

      lines: [],
    },
  ],
};
