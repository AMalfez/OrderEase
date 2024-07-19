export const TrimStringToDotted = (s:string, start:number, end:number)=>{
    const str = s.slice(start,end);
    return str+"...";
}

export const CreateUrl = (s:string)=>{
    s = s.toLowerCase();
  const parts:string[] = s.split(" ");
  let url:string = "";
  for(let i = 0; i<parts.length; i++) url+=parts[i];
  return url;
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}