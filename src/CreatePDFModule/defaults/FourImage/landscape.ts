import { lWidth, lHeight } from '@/others/constants';
import { createImage } from '@defaults/functions';
import { img_width, img_height } from '@defaults/FourImage/fourImage';

const img_x1 = 108;
const img_x2 = lWidth - img_x1 - img_width;
const img_y2 = 75;
const img_y1 = lHeight - img_y2 - img_height;

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

      images: [
        // y1 > y2
        createImage(img_x1, img_y1, img_width, img_height),
        createImage(img_x2, img_y1, img_width, img_height),
        createImage(img_x1, img_y2, img_width, img_height),
        createImage(img_x2, img_y2, img_width, img_height),
      ],
    },
  ],
};
