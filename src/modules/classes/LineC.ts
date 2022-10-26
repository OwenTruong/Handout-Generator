import { LineT } from "@/types/LineT";

export class LineC implements LineT {
  x1: number;
  x2: number;
  y1: number;
  y2: number;

  constructor(
    { x1, x2, y1, y2 }: { x1: number, x2: number, y1: number, y2: number }
  ) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  
}