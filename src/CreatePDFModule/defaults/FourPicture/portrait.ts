import { pWidth, pHeight } from '@/others/constants';
import { createpicture } from '@defaults/functions';
import { pic_width, pic_height } from '@defaults/FourPicture/fourPicture';

const pic_x1 = 50;
const pic_x2 = pWidth - pic_x1 - pic_width;
const pic_y2 = 250;
const pic_y1 = pHeight - pic_y2 / 3 - pic_height;

export const d4_print_portrait = {
  id: 40,
  name: 'Default 4 Print Portrait',

  pages: [
    {
      pageN: {
        x: pWidth - 50,
        y: 30,
        size: 12,
      },
      dim: [pWidth, pHeight],

      pictures: [
        // TODO: I need a uniform system where y1 > y2 in all of my templates
        // y1 > y2
        createpicture(pic_x1, pic_y1, pic_width, pic_height),
        createpicture(pic_x2, pic_y1, pic_width, pic_height),
        createpicture(pic_x1, pic_y2, pic_width, pic_height),
        createpicture(pic_x2, pic_y2, pic_width, pic_height),
      ],
    },
  ],
};