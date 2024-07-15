export const TrimStringToDotted = (s:string, start:number, end:number)=>{
    const str = s.slice(start,end);
    return str+"...";
}