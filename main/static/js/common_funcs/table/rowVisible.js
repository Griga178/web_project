function updateRowVisible(tableRow) {
  // показ кнопки сброса фильтров
  // let currentTable = tableRow.parentNode.parentNode
  // let clearBtn = currentTable.getElementsByTagName('button')[0]
  // clearBtn.style.display = "block"

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
