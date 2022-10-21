function editPrice() {
  let currentSpanPrice = spanPriceValue.innerHTML
  spanPriceValue.outerHTML = `<input type="text" onclick="closePriceEditor()" id="spanPriceValue" value="${currentSpanPrice}"></input>`
  spanPriceValue.select()
}
function closePriceEditor(){
  let currentInputPrice = spanPriceValue.value
  if (validPrice = isPriceValid(currentInputPrice)){
    spanPriceValue.outerHTML = `<span id="spanPriceValue">${validPrice}</span>`
    spanPriceValue.onclick = editPrice
    postNewPrice(validPrice)
  }
  else {
    alert("Промерьте правильность цены!")
  }
}

function editName() {
  alert(spanTextName)
}

function postNewPrice(newPrice){

  console.log('Зарегали цену и статус', newPrice)
}

function isPriceValid(inputPrice) {
  let currentPrice = inputPrice.replace(",", ".")
  currentPrice = parseFloat(currentPrice).toFixed(2)
  currentPrice = parseFloat(currentPrice)
  if (currentPrice){
    return currentPrice
  }
  else return false
}
