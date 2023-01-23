// columnSearchText убирает строки в которых нет искомого значения - в common_funcs
// columnFilterNumbFrom убирает строки в число >= искомого значения
// columnFilterNumbTo убирает строки в число <= искомого значения
// sortTable сортирует строки по выбранномустолбцу

function columnFilterNumbFrom(inputElement){
  let columnIdSplit = inputElement.id.split('_');
  let columnId = columnIdSplit[columnIdSplit.length - 1] // Номер столбца
  let filter = parseInt(inputElement.value); // Введенное значение
  // let tr = domainFilterTable.getElementsByTagName("tr"); // Список строк табл.
  let currentTable = document.getElementById(`${inputElement.dataset.tableid}`)
  let tr = currentTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[columnId]; // ячейка в которой ищем
    if (td) {
      let numValue = parseInt(td.textContent) || parseInt(td.innerText); // содержимое ячейки
      if (numValue >= filter || isNaN(filter)) {
        // удачный поиск
        td.dataset.showCell = "1"
      } else {
        // неудачный поиск
        td.dataset.showCell = "0"
      }
      updateRowVisible(tr[i]) // скрытие/показ строки
    }
  }
}

function columnFilterNumbTo(inputElement){
  let columnIdSplit = inputElement.id.split('_');
  let columnId = columnIdSplit[columnIdSplit.length - 1] // Номер столбца
  let filter = parseInt(inputElement.value); // Введенное значение
  // let tr = domainFilterTable.getElementsByTagName("tr"); // Список строк табл.
  let currentTable = document.getElementById(`${inputElement.dataset.tableid}`)
  let tr = currentTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[columnId]; // ячейка в которой ищем
    if (td) {
      let numValue = parseInt(td.textContent) || parseInt(td.innerText); // содержимое ячейки
      if (numValue <= filter || isNaN(filter)) {
        // удачный поиск
        td.dataset.showCell = "1"
      } else {
        // неудачный поиск
        td.dataset.showCell = "0"
      }
      updateRowVisible(tr[i]) // скрытие/показ строки
    }
  }
}

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
