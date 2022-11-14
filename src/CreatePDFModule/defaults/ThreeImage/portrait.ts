import { pWidth, pHeight } from '@constants/constants';
import { createLineBlock, createImage, createField } from '@defaults/functions';
import { img_width, img_height } from '@defaults/ThreeImage/threeImage';

const img_x = 30;

const img1_y = 80;
const img2_y = img1_y + (img_height + 71);
const img3_y = img1_y + (img_height + 71) + (img_height + 71);

const ln_x1 = 300;
const ln_x2 = 560;

const l1_y = img1_y + 5;
const l2_y = img2_y + 5;
const l3_y = img3_y + 5;

export const d3_print_portrait = {
  id: 30,
  name: 'Default 3 Print Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],
      lines: [
        ...createLineBlock(ln_x1, ln_x2, l1_y, l1_y),
        ...createLineBlock(ln_x1, ln_x2, l2_y, l2_y),
        ...createLineBlock(ln_x1, ln_x2, l3_y, l3_y),
      ],

      images: [
        // y-axis of image is reversed because img3_y > img1_y, we want from top y to bottom y
        createImage(img_x, img3_y, img_width, img_height),
        createImage(img_x, img2_y, img_width, img_height),
        createImage(img_x, img1_y, img_width, img_height),
      ],
    },
  ],
};

// Digital Portrait Specific //

export const d3_digital_portrait = {
  id: 31,
  name: 'Default 3 Digital Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],

      fields: [
        createField(ln_x1, img1_y, img_width, img_height),
        createField(ln_x1, img2_y, img_width, img_height),
        createField(ln_x1, img3_y, img_width, img_height),
      ],

      images: [
        // y-axis of image is reversed because img3_y > img1_y, we want from top y to bottom y
        createImage(img_x, img3_y, img_width, img_height),
        createImage(img_x, img2_y, img_width, img_height),
        createImage(img_x, img1_y, img_width, img_height),
      ],
    },
  ],
};
