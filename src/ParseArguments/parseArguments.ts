function splitArgs(array: string[]): string[][] {
  return array.reduce((acc, args) => {
    if (args[0] == '-') acc.push([args]);
    else if (acc.length == 0) return acc;
    else acc[acc.length - 1].push(args);
    return acc;
  }, new Array<Array<string>>());
}

export function parseArguments(argv: string[]): { [k: string]: string[] } {
  const args: string[] = argv.slice(2);
  const groups: string[][] = args.length == 0 ? [] : splitArgs(args);

  return groups.reduce(
    (acc: { [k: string]: string[] }, [flagName, ...values]) => {
      acc[flagName] = values;
      return acc;
    },
    {}
  );
}
