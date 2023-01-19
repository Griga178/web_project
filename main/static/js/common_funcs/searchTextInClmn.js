function columnSearchText(inputElement){
  let columnIdSplit = inputElement.id.split('_');
  let columnId = columnIdSplit[columnIdSplit.length - 1] // Номер столбца
  let filter = inputElement.value.toUpperCase(); // Введенное значение
  let currentTable = document.getElementById(`${inputElement.dataset.tableid}`)
  let tr = currentTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[columnId]; // ячейка в которой ищем
    if (td) {
      let txtValue = td.textContent || td.innerText; // содержимое ячейки
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        // удачный поиск
        td.dataset.showCell = "1"
        console.log('no search')
      } else {
        // неудачный поиск

        td.dataset.showCell = "0"
      }
      updateRowVisible(tr[i]) // скрытие/показ строки
    }
  }
}

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
