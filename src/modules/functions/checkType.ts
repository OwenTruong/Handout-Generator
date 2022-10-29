export function checkType(arr1: any[], arr2: string[]): boolean {
  for (let i = 0; i < arr1.length; ++i)
    if (typeof arr1[i] != arr2[i]) return false;

  return true;
}