import { pWidth, pHeight } from '@/others/constants';
import { createImage } from '@defaults/functions';
import { img_width, img_height } from '@defaults/FourImage/fourImage';

const img_x1 = 50;
const img_x2 = pWidth - img_x1 - img_width;
const img_y2 = 250;
const img_y1 = pHeight - img_y2 / 3 - img_height;

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

      images: [
        // TODO: I need a uniform system where y1 > y2 in all of my templates
        // y1 > y2
        createImage(img_x1, img_y1, img_width, img_height),
        createImage(img_x2, img_y1, img_width, img_height),
        createImage(img_x1, img_y2, img_width, img_height),
        createImage(img_x2, img_y2, img_width, img_height),
      ],
    },
  ],
};
