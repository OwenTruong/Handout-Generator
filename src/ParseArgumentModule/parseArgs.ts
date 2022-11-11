import { splitArgs } from './_splitArgs';

export type ArgsT = {
  pdfPath: string;
  imgPath: string;
  template: number;
};

/* 
  return [ 
    [ 'flag1', 'arg1', 'arg2', ... ], 
    [ 'flag2', 'arg1', 'arg2', ...],
    ...
  ]
  */

export function parseArgs(argv: string[]): ArgsT {
  const args: string[] = argv.slice(2);
  const groups: string[][] = args.length == 0 ? [] : splitArgs(args);

  const result: ArgsT = Object.assign(
    groups.map((group) => {
      if (group.length != 2) throw new Error('Not enough arguments for flag');

      if (group[0] == '-d') return { pdfPath: group[1] };
      if (group[0] == '-i') return { imgPath: group[1] };
      if (group[0] == '-df')
        return { template: Number(group[1]) == NaN ? 30 : Number(group[1]) };
    })
  );

  return result;
}
