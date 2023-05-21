function telephoneCheck(str) {
  //using regix.com
  let regix = /^1?\s?(\d{3}|\(\d{3}\))-?\s?\d{3}-?\s?\d{4}$/gm

  return regix.test(str);
}

console.log(telephoneCheck("555-555-5555"));