function createHeaderV2(){
  let information = [
    {    "name": "Домен",
          "search": [searchInputText]  },
    {    "name": "Кол-во ссылок",
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

function searchInputText(columnId){
  let inputElement = document.createElement('input')
  inputElement.setAttribute('onkeyup', 'columnSearchText(this)')
  inputElement.setAttribute('placeholder', 'Поиск..')
  inputElement.setAttribute('id', `input_${columnId}`)
  return inputElement
}

function searchInputNumbFrom(columnId){
  let inputElement = document.createElement('input')
  inputElement.setAttribute('type', 'number')
  inputElement.setAttribute('onkeyup', 'columnFilterNumbFrom(this)')
  inputElement.setAttribute('placeholder', 'От..')
  inputElement.setAttribute('id', `input_${columnId}`)
  return inputElement
}
function searchInputNumbTo(columnId){
  let inputElement = document.createElement('input')
  inputElement.setAttribute('type', 'number')
  inputElement.setAttribute('onkeyup', 'columnFilterNumbTo(this)')
  inputElement.setAttribute('placeholder', 'До..')
  inputElement.setAttribute('id', `input_${columnId}`)
  return inputElement
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
