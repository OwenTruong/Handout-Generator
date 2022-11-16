export function splitArgs(array: string[]): string[][] {
  return array.reduce((acc, args) => {
    if (args[0] == '-') acc.push([args]);
    else if (acc.length == 0) return acc;
    else acc[acc.length - 1].push(args);
    return acc;
  }, new Array<Array<string>>());
}

// export function splitArgs(array: string[]): string[][] {
//   const helper = (arr: string[]): string[][] => {
//     if (arr.length <= 0) return [[]];

//     const result: string[][] = helper(arr.slice(1));

//     if (arr[0][0] != '-' || array.length == arr.length)
//       return [[arr[0], ...result[0]], ...result.slice(1)];
//     else return [[], [arr[0], ...result[0]], ...result.slice(1)];
//   };

//   const result = helper(array);

//   if (result[0][0][0] != '-') return result.slice(1);
//   return result;
// }