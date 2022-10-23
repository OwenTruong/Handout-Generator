import { LineT } from './LineT';
import { ImageT } from './ImageT';

export type TemplateT = {
  name: string,
  page: {
    lines: LineT[],
    images: ImageT[],
  }[],
}