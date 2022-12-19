interface Label {
  x: number;
  y: number;
  size: number;
}

interface Line {
  x: number;
  y: number;
}

interface Textfield {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Picture {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Page {
  pageN: Label;
  lines: Line[];
  pictures: Picture[];
  fields: Textfield[];
  dim: [number, number];
}

interface Template {
  id: number;
  name: string;

  pages: Page[];
}
