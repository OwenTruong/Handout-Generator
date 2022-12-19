import { pWidth, pHeight } from '@/others/constants';
import { createPicture } from '@/defaults/functions';
import { pic_width, pic_height } from '@/defaults/TwoPicture/twoPicture';

const linepicSpace = 30;

const pic_x = (pWidth - pic_width) / 2;
const pic_y1 = pHeight - 50 - pic_height;
const pic_y2 = pic_y1 - (pic_height + linepicSpace) - pic_height / 2 - 10;

export const d2_nothing_portrait: Template = {
  id: 20,
  name: 'Default 2 Nothing Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],

      fields: [],

      pictures: [
        // y-axis of picture is reversed because pic3_y > pic1_y, we want from top y to bottom y
        createPicture(pic_x, pic_y1, pic_width, pic_height),
        createPicture(pic_x, pic_y2, pic_width, pic_height),
      ],

      lines: [],
    },
  ],
};
