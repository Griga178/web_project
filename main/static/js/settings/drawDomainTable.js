// function createHeaderV2(){
//   let information = [
//     {    "name": "Домен",
//           "search": [searchInputText]  },
//     {    "name": "Кол-во ссылок (всего)",
//         "search": [searchInputNumbFrom, searchInputNumbTo]  },
//     {    "name": "Настройки (есть/нет)",
//         "search": []  },
//     {    "name": "Компания",
//         "search": [searchInputText]  },
//   ]
//   let headerBlock = document.createElement('thead')
//   let headerFirstRow = document.createElement('tr')
//   let headerSecondRow = document.createElement('tr')
//   headerBlock.appendChild(headerFirstRow)
//   headerBlock.appendChild(headerSecondRow)
//   domainFilterTable.appendChild(headerBlock)
//
//   let clmIndexNum = 0
//   for (name in information) {
//     let rowCellName = document.createElement('th')
//     rowCellName.innerHTML = information[name].name
//     headerFirstRow.appendChild(rowCellName)
//     rowCellName.setAttribute('class', "theadNames") // Класс для сортировки
//     // rowCellName.setAttribute('style', '')
//     rowCellName.setAttribute('style', 'cursor: pointer; user-select: none')
//
//     let rowCellInput = document.createElement('th')
//     for (inpType in information[name].search){
//       let searchFunc = information[name].search[inpType]
//       let inputElement = searchFunc(clmIndexNum)
//       rowCellInput.appendChild(inputElement)
//     }
//
//     headerSecondRow.appendChild(rowCellInput)
//     clmIndexNum += 1
//   }
// }
//
// function createTableBody(domainObjectArray){
//   let bodyBlock = document.createElement('tbody')
//   domainFilterTable.appendChild(bodyBlock)
//
//   for (domainInd in domainObjectArray){
//     let bodyRow = document.createElement('tr')
//     let fileIdArray = getFilesIdFromLinks(domainObjectArray[domainInd].links)
//     bodyRow.setAttribute('class', "filterDiv")
//     bodyRow.setAttribute('data-fileId', fileIdArray)
//     bodyRow.setAttribute('data-fileFiltered', "1")
//     bodyRow.setAttribute('style', 'cursor: pointer')
//     bodyRow.setAttribute("onclick", `write_domain_setting(${domainObjectArray[domainInd].id}, "${domainObjectArray[domainInd].name}")`)
//     bodyBlock.appendChild(bodyRow)
//
//     let bodyRowCellDomain = document.createElement('td')
//     bodyRow.appendChild(bodyRowCellDomain)
//     bodyRowCellDomain.innerHTML = domainObjectArray[domainInd].name
//     bodyRowCellDomain.setAttribute('data-showCell', "1")
//
//     let bodyRowCellAmmount = document.createElement('td')
//     bodyRow.appendChild(bodyRowCellAmmount)
//     bodyRowCellAmmount.innerHTML = domainObjectArray[domainInd].links.length
//     bodyRowCellAmmount.setAttribute('data-showCell', "1")
//
//     let bodyRowCellSetting = document.createElement('td')
//     bodyRow.appendChild(bodyRowCellSetting)
//     bodyRowCellSetting.innerHTML = domainObjectArray[domainInd].domain_setts.length
//     bodyRowCellSetting.setAttribute('data-showCell', "1")
//
//     let bodyRowCellCompany = document.createElement('td')
//     bodyRow.appendChild(bodyRowCellCompany)
//     bodyRowCellCompany.innerHTML = domainObjectArray[domainInd].company
//     bodyRowCellCompany.setAttribute('data-showCell', "1")
//   }
//
// }
//
// function drawTableVerSecond(tableKeys, dataObjArray, tableId) {
//   let tableBlock = document.getElementById(tableId)
//   let tableBody = document.createElement('tbody')
//   tableBlock.appendChild(tableBody)
//   for (dataIndex in dataObjArray) {
//     let dataObject = dataObjArray[dataIndex]
//     let tableRow = document.createElement('tr')
//     tableRow.setAttribute('class', "filterDiv")
//     tableRow.setAttribute('style', 'cursor: pointer')
//     // ОТРИСОВКА БЛОКА СТРОКИ
//     // for (i in tableKeys.filters) {
//     //   tableRow.setAttribute('data-fileId', [1])
//     // }
//     tableBody.appendChild(tableRow)
//     // ОТРИСОВКА БЛОКА ЯЧЕЙКИ
//     for (i in tableKeys.columns) {
//       let infoKey = tableKeys.columns[i] // инфа о колонке
//       let tableCell = document.createElement('td')
//       tableCell.innerHTML = dataObject[infoKey.dataKey] // ключ содержимого
//       tableCell.setAttribute('data-showCell', "1")
//       tableRow.appendChild(tableCell)
//     }
//   }
// }
//
// function createHeaderV3(tableKeys, tableId){
//   let tableBlock = document.getElementById(tableId)
//   let headerBlock = document.createElement('thead')
//   let headerFirstRow = document.createElement('tr')
//   let headerSecondRow = document.createElement('tr')
//   headerBlock.appendChild(headerFirstRow)
//   headerBlock.appendChild(headerSecondRow)
//   tableBlock.appendChild(headerBlock)
//
//   for (i in tableKeys.columns) {
//     let infoKey = tableKeys.columns[i] // инфа о колонке
//     let rowCellName = document.createElement('th') // ячейка с именем
//     rowCellName.innerHTML = infoKey.name
//     rowCellName.setAttribute('class', "theadNames") // Класс для сортировки
//     rowCellName.setAttribute('style', 'cursor: pointer; user-select: none')
//     headerFirstRow.appendChild(rowCellName)
//
//     let rowCellInput = document.createElement('th') // ячейка с инпутом
//     headerSecondRow.appendChild(rowCellInput)
//     if (infoKey.searchBy) {
//       let searchFunc = infoKey.searchBy
//       let inputElement = searchFunc(i)
//       rowCellInput.appendChild(inputElement)
//     }
//   }
// }

function createHeaderV4(tableKeys){
  let tableBlock = document.getElementById(tableKeys.htmlTableId)
  let headerBlock = document.createElement('thead')
  let headerFirstRow = document.createElement('tr')
  let headerSecondRow = document.createElement('tr')
  headerBlock.appendChild(headerFirstRow)
  headerBlock.appendChild(headerSecondRow)
  tableBlock.appendChild(headerBlock)

  tableBlock.setAttribute('data-chosenkeys', `${false}`) // Класс для сортировки

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
function loadDomainSetting(thisObj) {
  let domainName = thisObj.getElementsByTagName("td")
  write_domain_setting(thisObj.dataset.primarykey, domainName[0].innerHTML)
}

function createBodyV3(tableKeys) {
  let tableBlock = document.getElementById(tableKeys.htmlTableId)
  let tableBody = document.createElement('tbody')
  tableBlock.appendChild(tableBody)
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
