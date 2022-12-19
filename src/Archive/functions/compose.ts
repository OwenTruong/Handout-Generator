export function compose(...fns: Function[]): (x: any) => any {
  return (x: any): any => fns.reduceRight((input, fn) => fn(input), x);
}
