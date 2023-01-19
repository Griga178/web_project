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

function updateRowVisible(tableRow) {
  let rowDisplayArray = [] // массив для определения display

  let tdArray = tableRow.getElementsByTagName("td") // все ячейки в строке
  // console.log(tableRow.dataset.fileFiltered)
  if (tableRow.dataset.displayrow === '1'){ // проверка по файлу

    // ЕСЛИ СОДЕРЖИМОЕ ЯЧЕЙКИ НЕ УДОВЛЕТВОРЯЕТ ПОИСКУ
    // ЯЧЕЙКА ПОМЕЧАЕТСЯ "0"
    for (cellIndex in tdArray) {
      if (tdArray[cellIndex].dataset) {
      rowDisplayArray.push(tdArray[cellIndex].dataset.showCell)
      }
    }
    // ЕСЛИ ВО ВСЕЙ СТРОКЕ ЕСТЬ ХОТЬ 1 ЯЧЕЙКА С "0" - СТРОКА СКРЫВАЕТСЯ
    if (rowDisplayArray.indexOf("0") != -1) hideRow(tableRow);
    else showRow(tableRow);
  }
  else hideRow(tableRow)


}

function hideRow(tableRow) {  tableRow.style.display = "none"}
function showRow(tableRow) {  tableRow.style.display = "table-row"}

// https://v3c.ru/javascript/sort-table
document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table_sort .theadNames').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});

// КНОПОЧНЫЙ ФИЛЬТР

function filterSelection(tableRowObj) {
  // находим список строк на которые распростроняется фильтр
  // (во всех таблицах)
  let filterNameText = tableRowObj.dataset.filtername
  let rowArray = document.querySelectorAll(`[data-${filterNameText}]`);
  // по какому id будем фильтровать
  let rowId = tableRowObj.dataset.primarykey
  console.log(rowId)

  // добавить датасет в <table data-chosen = [1,2]>
  // для отслеживание выбранных фильтров
  // в элементе ставим active
  // в список id добавляем id из датасета элемента

  let idFilesArr = [rowId] // этот список надо брать из таблицы в которой лежит фильтр

  for (i = 2; i < rowArray.length; i++) {
    let rowIdFilesArr = rowArray[i].dataset[filterNameText] // список id фалов, связанных с доменом

    if (rowIdFilesArr) {
      let intersection = idFilesArr.filter(x => rowIdFilesArr.includes(x));
      // если есть пересечение то оставляем строки
      if (Boolean(intersection.length)){
        rowArray[i].dataset.displayrow = '1'
      }
      else {
        rowArray[i].dataset.displayrow = '0'
      }
    }
    updateRowVisible(rowArray[i]) // скрытие/показ строки
  }
}
