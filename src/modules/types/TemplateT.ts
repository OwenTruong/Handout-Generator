import { LineT } from './LineT';
import { ImageT } from './ImageT';

export type TemplateT = {
  name: string,
  pages: {
    lines: LineT[],
    images: ImageT[],
  }[],
}