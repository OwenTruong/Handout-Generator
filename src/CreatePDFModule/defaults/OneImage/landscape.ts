import { lWidth, lHeight } from '@constants/constants';
import { createField, createImage, createLineBlock } from '@defaults/functions';
import { img_width, img_height } from '@defaults/OneImage/oneImage';

const lineImgSpace = 30;

const img_x = (lWidth - img_width) / 2;
const img_y1 = lHeight - 50 - img_height;
const img_y2 = img_y1 - (img_height + lineImgSpace) - img_height / 2 - 10;

const ln_x1 = img_x;
const ln_x2 = img_x + img_width;
const ln_y = img_y2 - 60;

export const d1_nothing_landscape = {
  id: 14,
  name: 'Default 1 Nothing Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [lWidth, lHeight],

      images: [createImage(img_x, img_y1, img_width, img_height)],
    },
  ],
};

export const d1_print_landscape = {
  id: 14,
  name: 'Default 1 Print Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [lWidth, lHeight],

      lines: [...createLineBlock(ln_x1, ln_x2, ln_y, ln_y)],

      images: [createImage(img_x, img_y1, img_width, img_height)],
    },
  ],
};

export const d1_digital_landscape = {
  id: 15,
  name: 'Default 1 Digital Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [lWidth, lHeight],

      fields: [createField(img1_x, fd_y, img_width, img_height)],

      images: [createImage(img_x, img_y1, img_width, img_height)],
    },
  ],
};
