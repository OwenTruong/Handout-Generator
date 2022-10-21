export class ImageProperty {
  format: string;
  x: number;
  y: number;
  width: number;
  height: number;


  constructor(
    format: string, 
    x: number, 
    y: number, 
    width: number, 
    height: number
  ) {
    this.format = format;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
