export function createLine(x1: number, x2: number, y1: number, y2: number) {
  return { x1, x2, y1, y2 };
}

export function createLineBlock(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  lines = 6
) {
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
) {
  return { x, y, width, height };
}

export function createImage(
  x: number,
  y: number,
  width: number,
  height: number
) {
  return { x, y, width, height };
}
