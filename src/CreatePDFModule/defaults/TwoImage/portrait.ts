import { pWidth, pHeight } from '@constants/constants';
import { createImage } from '@defaults/functions';
import { img_width, img_height } from '@defaults/TwoImage/twoImage';

const lineImgSpace = 30;

const img_x = (pWidth - img_width) / 2;
const img_y1 = pHeight - 50 - img_height;
const img_y2 = img_y1 - (img_height + lineImgSpace) - img_height / 2 - 10;

export const d2_nothing_portrait = {
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

      images: [
        // y-axis of image is reversed because img3_y > img1_y, we want from top y to bottom y
        createImage(img_x, img_y1, img_width, img_height),
        createImage(img_x, img_y2, img_width, img_height),
      ],
    },
  ],
};
