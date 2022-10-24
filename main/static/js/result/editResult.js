function editPrice() {
  let currentSpanPrice = spanPriceValue.innerHTML
  spanPriceValue.outerHTML = `<input type="text" data-price="${currentSpanPrice}"onclick="closePriceEditor()" id="spanPriceValue" value="${currentSpanPrice}"></input>`
  spanPriceValue.select()
}
function closePriceEditor(){
  let currentResultPrice = parseFloat(spanPriceValue.getAttribute('data-price'))
  let validPrice = isPriceValid(spanPriceValue.value)
  console.log(currentResultPrice, validPrice)
  if (validPrice){
    spanPriceValue.outerHTML = `<span id="spanPriceValue">${validPrice}</span>`
    spanPriceValue.onclick = editPrice

    if (validPrice !== currentResultPrice){
      console.log(typeof(validPrice), validPrice, '===', typeof parseFloat(currentResultPrice), parseFloat(currentResultPrice))
      postNewPrice(validPrice)
    }
    else console.log('Цена не поменялась')
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
