function createHeaderV4(tableKeys){
  let tableBlock = document.getElementById(tableKeys.htmlTableId)
  let headerBlock = document.createElement('thead')
  let headerFirstRow = document.createElement('tr')
  let headerSecondRow = document.createElement('tr')
  headerBlock.appendChild(headerFirstRow)
  headerBlock.appendChild(headerSecondRow)
  tableBlock.appendChild(headerBlock)

  tableBlock.setAttribute('data-chosenkeys', "") // Класс для сортировки

  for (i in tableKeys.columns) {
    let infoKey = tableKeys.columns[i] // инфа о колонке

    let rowCellName = document.createElement('th') // ячейка с именем
    rowCellName.innerHTML = infoKey.name // название колонки
    rowCellName.setAttribute('class', "theadNames") // Класс для сортировки
    rowCellName.setAttribute('style', 'cursor: pointer; user-select: none')
    headerFirstRow.appendChild(rowCellName)

    let rowCellInput = document.createElement('th') // ячейка с инпутом
    if (infoKey.searchBy) {
      let searchFunc = infoKey.searchBy
      let inputElement = searchFunc(i, tableKeys.htmlTableId)
      rowCellInput.appendChild(inputElement)
    }
    headerSecondRow.appendChild(rowCellInput)
  }
  // создание кнопки сброса фильтров
  let clearThBtn = document.createElement("th")
  let clearBtn = document.createElement("button")
  clearBtn.innerHTML = 'Очистить фильтр'
  clearBtn.setAttribute('onclick', `clearFilters("${tableKeys.htmlTableId}")`)
  clearBtn.setAttribute('style', 'display: none;')
  headerFirstRow.appendChild(clearThBtn)
  clearThBtn.appendChild(clearBtn)
}
function clearFilters(tableBlockId){
  let tableBlock = document.getElementById(tableBlockId)
  let inputArr = tableBlock.getElementsByTagName("input")
  // console.log("hello", tableBlockId)
  console.log(inputArr)
}

function createBodyV3(tableKeys) {
  let tableBlock = document.getElementById(tableKeys.htmlTableId)
  let tableBody = document.createElement('tbody')
  tableBlock.appendChild(tableBody)
  // рисуем первую строку в фильтр таблице - "выбрать все"
  if (tableKeys.filterName) {
    let tableFirstRow = document.createElement('tr')
    tableFirstRow.setAttribute('class', "filterDiv btn")
    tableFirstRow.setAttribute('style', 'cursor: pointer')
    tableFirstRow.setAttribute('onclick', "choseAll(this)")
    tableFirstRow.setAttribute('data-filterName', `${tableKeys.filterName}`)
    tableFirstRow.setAttribute('data-primarykey', "0")
    tableFirstRow.innerHTML = 'Выбрать все'
    tableBody.appendChild(tableFirstRow)
    }

  for (dataIndex in tableKeys.dataArray) {
    let dataObject = tableKeys.dataArray[dataIndex]
    // ОТРИСОВКА БЛОКА СТРОКИ
    let tableRow = document.createElement('tr')
    tableRow.setAttribute('class', "filterDiv btn")
    tableRow.setAttribute('style', 'cursor: pointer')
    tableRow.setAttribute('onclick', "filterSelection(this)")
    if (tableKeys.rowFunc){
      // tableRow.onclick += `; ${tableKeys.rowFunc}`
      // tableRow.onclick = `${tableKeys.rowFunc}`
      tableRow.setAttribute('onclick', "loadDomainSetting(this)")
    }
    tableRow.setAttribute('data-primarykey', `${dataObject.id}`)
    tableRow.setAttribute('data-filterName', `${tableKeys.filterName}`)
    tableRow.setAttribute('data-displayRow', '1')

    for (i in tableKeys.foreignConnection) {
      let foreignKeyStr = tableKeys.foreignConnection[i]
      tableRow.setAttribute(`data-${foreignKeyStr}`, `${dataObject[foreignKeyStr]}`)
    }
    tableBody.appendChild(tableRow)
    // ОТРИСОВКА БЛОКА ЯЧЕЙКИ
    for (i in tableKeys.columns) {
      let infoKey = tableKeys.columns[i] // инфа о колонке
      let tableCell = document.createElement('td')
      tableCell.innerHTML = dataObject[infoKey.dataKey] // ключ содержимого
      tableCell.setAttribute('data-showCell', "1")
      tableRow.appendChild(tableCell)
    }
  }
}

function drawTable(tableKeys) {
  // отрисовка основной таблицы
  createHeaderV4(tableKeys)
  createBodyV3(tableKeys)
}
