const validationMessages={
  email:{
    required:"Email is required!",
    invalidEmail:"Please enter valid email"
  },
  password:{
    required:"Password is required",
    length:"Password must be longer than 8 characters"
  },
  fullname:{
    required:"Fullname is required",
    invalid:"Fullname not contain any symbol or digit"
  },
  mobile:{
    required:"Phone number is required",
    length:"Phone number length is 10 or 14 digit",
    invalid:"Phone number not contain any text or symbol"
  }
}

export default validationMessages;