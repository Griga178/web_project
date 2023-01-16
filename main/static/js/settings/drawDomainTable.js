function createHeaderV2(information){
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
    // rowCellName.setAttribute('onclick', `sortTable(${clmIndexNum})`)
    rowCellName.setAttribute('class', "theadNames")
    rowCellName.setAttribute('style', 'user-select: none')
    rowCellName.setAttribute('style', 'cursor: pointer')
    let rowCellInput = document.createElement('th')
    let cellInput = document.createElement('input')
    rowCellInput.appendChild(cellInput)
    cellInput.setAttribute('onkeyup', `myFunction("domainInput_${clmIndexNum}")`)
    cellInput.setAttribute('placeholder', 'Поиск..')
    cellInput.setAttribute('id', `domainInput_${clmIndexNum}`)
    // cellInput.setAttribute('type', "search")

    headerSecondRow.appendChild(rowCellInput)
    clmIndexNum += 1
  }
}

function createTableBody(domainObjectArray){
  let bodyBlock = document.createElement('tbody')
  domainFilterTable.appendChild(bodyBlock)

  for (domainInd in domainObjectArray){
    let bodyRow = document.createElement('tr')
    bodyRow.setAttribute('class', "filterDiv")
    bodyBlock.appendChild(bodyRow)

    let bodyRowCellDomain = document.createElement('td')
    bodyRow.appendChild(bodyRowCellDomain)
    bodyRowCellDomain.innerHTML = domainObjectArray[domainInd].name
    bodyRowCellDomain.setAttribute('data-filtered', "0")

    let bodyRowCellAmmount = document.createElement('td')
    bodyRow.appendChild(bodyRowCellAmmount)
    bodyRowCellAmmount.innerHTML = domainObjectArray[domainInd].links.length
    bodyRowCellAmmount.setAttribute('data-filtered', "0")

    let bodyRowCellSetting = document.createElement('td')
    bodyRow.appendChild(bodyRowCellSetting)
    bodyRowCellSetting.innerHTML = domainObjectArray[domainInd].domain_setts.length
    bodyRowCellSetting.setAttribute('data-filtered', "0")

  }

}
