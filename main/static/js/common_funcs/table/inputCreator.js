function searchInputText(columnId, tableId){
  let inputElement = document.createElement('input')
  inputElement.setAttribute('onkeyup', 'columnSearchText(this)')
  inputElement.setAttribute('placeholder', 'Поиск..')
  inputElement.setAttribute('id', `input_${columnId}`)
  inputElement.setAttribute('data-tableid', `${tableId}`)
  return inputElement
}

function searchInputNumbFrom(columnId, tableId){
  let inputElement = document.createElement('input')
  inputElement.setAttribute('type', 'number')
  inputElement.setAttribute('onkeyup', 'columnFilterNumbFrom(this)')
  inputElement.setAttribute('placeholder', 'От..')
  inputElement.setAttribute('id', `input_${columnId}`)
  inputElement.setAttribute('data-tableid', `${tableId}`)
  return inputElement
}
function searchInputNumbTo(columnId, tableId){
  let inputElement = document.createElement('input')
  inputElement.setAttribute('type', 'number')
  inputElement.setAttribute('onkeyup', 'columnFilterNumbTo(this)')
  inputElement.setAttribute('placeholder', 'До..')
  inputElement.setAttribute('id', `input_${columnId}`)
  inputElement.setAttribute('data-tableid', `${tableId}`)
  return inputElement
}
