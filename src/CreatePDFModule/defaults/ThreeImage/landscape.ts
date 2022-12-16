import { lWidth, lHeight } from '@/others/constants';
import { createLineBlock, createImage, createField } from '@defaults/functions';
import { img_width, img_height } from '@defaults/ThreeImage/threeImage';

const img1_x = 30;
const img2_x = 30 + img_width + 30;
const img3_x = 30 + img_width + 30 + img_width + 30;

const img_y = lHeight - 100 - img_height;

const l1_x1 = img1_x;
const l2_x1 = img2_x;
const l3_x1 = img3_x;

const l1_x2 = img1_x + img_width;
const l2_x2 = img2_x + img_width;
const l3_x2 = img3_x + img_width;

const ln_y = img_y - img_height - 40;

export const d3_print_landscape = {
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

      lines: [
        ...createLineBlock(l1_x1, l1_x2, ln_y, ln_y),
        ...createLineBlock(l2_x1, l2_x2, ln_y, ln_y),
        ...createLineBlock(l3_x1, l3_x2, ln_y, ln_y),
      ],

      images: [
        createImage(img1_x, img_y, img_width, img_height),
        createImage(img2_x, img_y, img_width, img_height),
        createImage(img3_x, img_y, img_width, img_height),
      ],
    },
  ],
};

export const d3_digital_landscape = {
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
        createField(img1_x, ln_y, img_width, img_height),
        createField(img2_x, ln_y, img_width, img_height),
        createField(img3_x, ln_y, img_width, img_height),
      ],

      images: [
        createImage(img1_x, img_y, img_width, img_height),
        createImage(img2_x, img_y, img_width, img_height),
        createImage(img3_x, img_y, img_width, img_height),
      ],
    },
  ],
};
