export default function phoneNumberValidation(number:string){
  return /^\+?(\d{1,3})?[-.\s]?(\d{10})$/.test(number)
}