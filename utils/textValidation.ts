export default function textValidation(text:string){
  return /^[a-zA-Z\s]+$/.test(text);

};