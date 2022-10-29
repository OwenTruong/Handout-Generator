export function checkData(...data: any[]): boolean {
  for (let i = 0; i < data.length; ++i)
    if (data[i] == null || data[i] === undefined) return false;

  return true;
}