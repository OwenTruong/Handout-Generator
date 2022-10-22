
// Input: File name, Output: File Extension
export function getFileExts(name: string): string {

  const regex = /\.[0-9a-z]+$/i;
  const result: RegExpMatchArray | null = name.match(regex);

  if (result == null) return 'Invalid Files';
  else return result[0].slice(1);
}