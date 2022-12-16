import { lWidth, lHeight } from '@/others/constants';
import {
  createLineBlock,
  createpicture,
  createField,
} from '@defaults/functions';
import { pic_width, pic_height } from '@defaults/TwoPicture/twoPicture';

const offset = 100;
const pic1_x = offset;
const pic2_x = lWidth - offset - pic_width;

const pic_y = lHeight - 50 - pic_height;

const l1_x1 = pic1_x;
const l2_x1 = pic2_x;
const l1_x2 = pic1_x + pic_width;
const l2_x2 = pic2_x + pic_width;

const l_y = pic_y - 30 * 5 - 60;

const fd_y = l_y - 30;

export const d2_print_landscape = {
  id: 22,
  name: 'Default 2 Print Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },

      dim: [lWidth, lHeight],

      lines: [
        ...createLineBlock(l1_x1, l1_x2, l_y, l_y),
        ...createLineBlock(l2_x1, l2_x2, l_y, l_y),
      ],

      pictures: [
        createpicture(pic1_x, pic_y, pic_width, pic_height),
        createpicture(pic2_x, pic_y, pic_width, pic_height),
      ],
    },
  ],
};

export const d2_digital_landscape = {
  id: 23,
  name: 'Default 2 Digital Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },

      dim: [lWidth, lHeight],

      fields: [
        createField(pic1_x, fd_y, pic_width, pic_height),
        createField(pic2_x, fd_y, pic_width, pic_height),
      ],

      pictures: [
        createpicture(pic1_x, pic_y, pic_width, pic_height),
        createpicture(pic2_x, pic_y, pic_width, pic_height),
      ],
    },
  ],
};