function createHeaderV2(){
  let information = [
    {    "name": "Домен",
          "search": [searchInputText]  },
    {    "name": "Кол-во ссылок (всего)",
        "search": [searchInputNumbFrom, searchInputNumbTo]  },
    {    "name": "Настройки (есть/нет)",
        "search": []  },
    {    "name": "Компания",
        "search": [searchInputText]  },
  ]
  let headerBlock = document.createElement('thead')
  let headerFirstRow = document.createElement('tr')
  let headerSecondRow = document.createElement('tr')
  headerBlock.appendChild(headerFirstRow)
  headerBlock.appendChild(headerSecondRow)
  domainFilterTable.appendChild(headerBlock)

  let clmIndexNum = 0
  for (name in information) {
    let rowCellName = document.createElement('th')
    rowCellName.innerHTML = information[name].name
    headerFirstRow.appendChild(rowCellName)
    rowCellName.setAttribute('class', "theadNames") // Класс для сортировки
    // rowCellName.setAttribute('style', '')
    rowCellName.setAttribute('style', 'cursor: pointer; user-select: none')

    let rowCellInput = document.createElement('th')
    for (inpType in information[name].search){
      let searchFunc = information[name].search[inpType]
      let inputElement = searchFunc(clmIndexNum)
      rowCellInput.appendChild(inputElement)
    }

    headerSecondRow.appendChild(rowCellInput)
    clmIndexNum += 1
  }
}

function createTableBody(domainObjectArray){
  let bodyBlock = document.createElement('tbody')
  domainFilterTable.appendChild(bodyBlock)

  for (domainInd in domainObjectArray){
    let bodyRow = document.createElement('tr')
    let fileIdArray = getFilesIdFromLinks(domainObjectArray[domainInd].links)
    bodyRow.setAttribute('class', "filterDiv")
    bodyRow.setAttribute('data-fileId', fileIdArray)
    bodyRow.setAttribute('data-fileFiltered', "1")
    bodyRow.setAttribute('style', 'cursor: pointer')
    bodyRow.setAttribute("onclick", `write_domain_setting(${domainObjectArray[domainInd].id}, "${domainObjectArray[domainInd].name}")`)
    bodyBlock.appendChild(bodyRow)

    let bodyRowCellDomain = document.createElement('td')
    bodyRow.appendChild(bodyRowCellDomain)
    bodyRowCellDomain.innerHTML = domainObjectArray[domainInd].name
    bodyRowCellDomain.setAttribute('data-showCell', "1")

    let bodyRowCellAmmount = document.createElement('td')
    bodyRow.appendChild(bodyRowCellAmmount)
    bodyRowCellAmmount.innerHTML = domainObjectArray[domainInd].links.length
    bodyRowCellAmmount.setAttribute('data-showCell', "1")

    let bodyRowCellSetting = document.createElement('td')
    bodyRow.appendChild(bodyRowCellSetting)
    bodyRowCellSetting.innerHTML = domainObjectArray[domainInd].domain_setts.length
    bodyRowCellSetting.setAttribute('data-showCell', "1")

    let bodyRowCellCompany = document.createElement('td')
    bodyRow.appendChild(bodyRowCellCompany)
    bodyRowCellCompany.innerHTML = domainObjectArray[domainInd].company
    bodyRowCellCompany.setAttribute('data-showCell', "1")
  }

}

function drawTableVerSecond(tableKeys, dataObjArray, tableId) {
  let tableBlock = document.getElementById(tableId)
  let tableBody = document.createElement('tbody')
  tableBlock.appendChild(tableBody)
  for (dataIndex in dataObjArray) {
    let dataObject = dataObjArray[dataIndex]
    let tableRow = document.createElement('tr')
    tableRow.setAttribute('class', "filterDiv")
    // tableRow.setAttribute('data-fileFiltered', "1")
    tableRow.setAttribute('style', 'cursor: pointer')
    tableBody.appendChild(tableRow)
    // ОТРИСОВКА БЛОКА СТРОКИ
    // for (i in tableKeys.filters) {
    //   tableRow.setAttribute('data-fileId', [1])
    // }
    // ОТРИСОВКА БЛОКА ЯЧЕЙКИ
    for (i in tableKeys.columns) {
      let infoKey = tableKeys.columns[i] // объект от сервера
      let tableCell = document.createElement('td')
      tableCell.innerHTML = dataObject[infoKey.dataKey] // ключ содержимого
      tableCell.setAttribute('data-showCell', "1")
      tableRow.appendChild(tableCell)
    }
  }
}
