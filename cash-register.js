function checkCashRegister(price, cash, register) {
  let change = {};
  change.status = "OPEN";
  change.change = [];

  // handling the insufficient funds case
  let totalAmountInRegister = 
  Math.round(register.reduce((acc, coin) => acc + coin[1], 0)* 100)/100;
  console.log("In Register",totalAmountInRegister);

  let amountDue = Math.round((cash-price) * 100)/100;
  if(amountDue > totalAmountInRegister){
    change.status = "INSUFFICIENT_FUNDS"
    return change;
  }

  // Handle has exact amount of change
  if (totalAmountInRegister === amountDue){
    change.status = "CLOSED"
    change.change = register;
    return change;
  }

  // Handle the correct amount
  const AMOUNTS = {
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  }
  Object.keys(AMOUNTS).forEach((key) => {
    if(amountDue > AMOUNTS[key]){
      let amountOfBillInRegister = 0;
      register.forEach((type) => {
        if (type[0] == key){
          amountOfBillInRegister = type[1];
        }
      })
  let amountDueBefore = amountDue;
  amountDue = amountDue % AMOUNTS[key];
  amountDue = Math.round(amountDue * 100)/100;
  let difference = Math.round((amountDueBefore - amountDue) * 100)/100;
  if(difference > amountOfBillInRegister){
    change.change.push([key, amountOfBillInRegister])
    amountDue = amountDueBefore - amountOfBillInRegister;

  } else {
    change.change.push([key, difference])
  }
    }
  })
  if(amountDue > 0){
    change.status = "INSUFFICIENT_FUNDS";
    change.change = [];
    return change;
      }
  return change;
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 0.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));