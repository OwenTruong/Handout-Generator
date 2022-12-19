import { Line, Picture, Textfield } from '@others/types';

export function createLine(
  x1: number,
  x2: number,
  y1: number,
  y2: number
): Line {
  return { x1, x2, y1, y2 };
}

export function createLineBlock(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  lines = 6
): Line[] {
  const arr: any[] = [];
  const spacing = 30;
  for (let i = 0; i < lines; i++)
    arr.push(createLine(x1, x2, y1 + spacing * i, y2 + spacing * i));

  return arr;
}

export function createField(
  x: number,
  y: number,
  width: number,
  height: number
): Textfield {
  return { x, y, width, height };
}

export function createPicture(
  x: number,
  y: number,
  width: number,
  height: number
): Picture {
  return { x, y, width, height };
}
