import { lWidth, lHeight } from '@/others/constants';
import { createPicture } from '@defaults/functions';
import { pic_width, pic_height } from '@defaults/FourPicture/fourPicture';

const pic_width_modified = pic_width * 1.25;
const pic_height_modified = pic_height * 1.25;

const pic_x1 = 75;
const pic_x2 = lWidth - pic_x1 - pic_width_modified;
const pic_y2 = 40;
const pic_y1 = lHeight - pic_y2 - pic_height_modified;

export const d4_print_landscape: Template = {
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

      fields: [],
      pictures: [
        // y1 > y2
        createPicture(pic_x1, pic_y1, pic_width_modified, pic_height_modified),
        createPicture(pic_x2, pic_y1, pic_width_modified, pic_height_modified),
        createPicture(pic_x1, pic_y2, pic_width_modified, pic_height_modified),
        createPicture(pic_x2, pic_y2, pic_width_modified, pic_height_modified),
      ],

      lines: [],
    },
  ],
};
