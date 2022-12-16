import { lWidth, lHeight } from '@/others/constants';
import { createpicture } from '@defaults/functions';
import { pic_width, pic_height } from '@defaults/FourPicture/fourPicture';

const pic_x1 = 108;
const pic_x2 = lWidth - pic_x1 - pic_width;
const pic_y2 = 75;
const pic_y1 = lHeight - pic_y2 - pic_height;

export const d4_print_landscape = {
  id: 42,
  name: 'Default 4 Print Landscape',

  pages: [
    {
      pageN: {
        x: lWidth - 50,
        y: 30,
        size: 12,
      },

      dim: [lWidth, lHeight],

      pictures: [
        // y1 > y2
        createpicture(pic_x1, pic_y1, pic_width, pic_height),
        createpicture(pic_x2, pic_y1, pic_width, pic_height),
        createpicture(pic_x1, pic_y2, pic_width, pic_height),
        createpicture(pic_x2, pic_y2, pic_width, pic_height),
      ],
    },
  ],
};
