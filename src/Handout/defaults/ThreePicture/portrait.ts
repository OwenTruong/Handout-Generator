import { pWidth, pHeight } from '@/others/constants';
import {
  createLineBlock,
  createPicture,
  createField,
} from '@/defaults/functions';
import { pic_width, pic_height } from '@/defaults/ThreePicture/threePicture';
import { Template } from '@/others/types';

const pic_x = 30;

const pic1_y = 80;
const pic2_y = pic1_y + (pic_height + 71);
const pic3_y = pic1_y + (pic_height + 71) + (pic_height + 71);

const ln_x1 = 300;
const ln_x2 = 560;

const l1_y = pic1_y + 5;
const l2_y = pic2_y + 5;
const l3_y = pic3_y + 5;

export const d3_print_portrait: Template = {
  id: 'ThreeTraitLine',
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

      pictures: [
        // y-axis of picture is reversed because pic3_y > pic1_y, we want from top y to bottom y
        createPicture(pic_x, pic3_y, pic_width, pic_height),
        createPicture(pic_x, pic2_y, pic_width, pic_height),
        createPicture(pic_x, pic1_y, pic_width, pic_height),
      ],
      fields: [],
    },
  ],
};

// Digital Portrait Specific //

export const d3_digital_portrait: Template = {
  id: 'ThreeTraitField',
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
        createField(ln_x1, pic1_y, pic_width, pic_height),
        createField(ln_x1, pic2_y, pic_width, pic_height),
        createField(ln_x1, pic3_y, pic_width, pic_height),
      ],

      pictures: [
        // y-axis of picture is reversed because pic3_y > pic1_y, we want from top y to bottom y
        createPicture(pic_x, pic3_y, pic_width, pic_height),
        createPicture(pic_x, pic2_y, pic_width, pic_height),
        createPicture(pic_x, pic1_y, pic_width, pic_height),
      ],

      lines: [],
    },
  ],
};
