import { pWidth, pHeight } from '@/others/constants';
import {
  createField,
  createPicture,
  createLineBlock,
} from '@/defaults/functions';
import { pic_width, pic_height } from '@/defaults/OnePicture/onePicture';

const pic_x = (pWidth - pic_width) / 2;
const pic_y = pHeight - 50 - pic_height;

const ln_x1 = pic_x;
const ln_x2 = pic_x + pic_width;
const ln_y = pic_y - 300;

// const fd_y = pic_y - pic_height;
const fd_height = pic_height / 1.7;
const fd_y = pic_y - fd_height - 50;

export const d1_nothing_portrait: Template = {
  id: 10,
  name: 'Default 1 Nothing Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],

      fields: [],
      pictures: [createPicture(pic_x, pic_y, pic_width, pic_height)],
      lines: [],
    },
  ],
};

export const d1_print_portrait: Template = {
  id: 11,
  name: 'Default 1 Print Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],

      fields: [],
      pictures: [createPicture(pic_x, pic_y, pic_width, pic_height)],
      lines: [...createLineBlock(ln_x1, ln_x2, ln_y, ln_y, 10)],
    },
  ],
};

export const d1_digital_portrait: Template = {
  id: 12,
  name: 'Default 1 Digital Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],

      fields: [createField(ln_x1, fd_y, pic_width, fd_height)],
      pictures: [createPicture(pic_x, pic_y, pic_width, pic_height)],
      lines: [],
    },
  ],
};
