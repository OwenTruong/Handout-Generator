import { splitArgs } from './_splitArgs';
import { defaultTempID } from '@constants/constants';

export type ArgsT = {
  output: string;
  input: string;
  id: number;
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
    {},
    ...groups.map((group) => {
      if (group.length != 2) throw new Error('Not enough arguments for flag');

      if (group[0] == '-d') return { output: group[1] };
      if (group[0] == '-i') return { input: group[1] };
      if (group[0] == '-t') {
        if (!Number(group[1])) throw new Error('Template ID must be a number');
        return { id: group[1] };
      }
    })
  );

  return result.id ? result : Object.assign(result, { id: defaultTempID });
}
