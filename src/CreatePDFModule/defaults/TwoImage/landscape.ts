import { lWidth, lHeight } from '@constants/constants';
import { createLineBlock, createImage, createField } from '@defaults/functions';
import { img_width, img_height } from '@defaults/ThreeImage/threeImage';

const img1_x = lWidth - 30 * 2 - img_width;
const img2_x = img1_x + img_width + 30;

const img_y = lHeight - 100 - img_height;

const l1_x1 = img1_x;
const l2_x1 = img2_x;
const l1_x2 = img1_x + img_width;
const l2_x2 = img2_x + img_width;

const l_y = img_y - img_height - 40;

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
        ...createLineBlock(l1_x1, l1_x2, ln_y, ln_y),
        ...createLineBlock(l2_x1, l2_x2, ln_y, ln_y),
      ],

      images: [
        createImage(img1_x, img_y, img_width, img_height),
        createImage(img2_x, img_y, img_width, img_height),
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
        createField(img1_x, ln_y, img_width, img_height),
        createField(img2_x, ln_y, img_width, img_height),
      ],

      images: [
        createImage(img1_x, img_y, img_width, img_height),
        createImage(img2_x, img_y, img_width, img_height),
      ],
    },
  ],
};
