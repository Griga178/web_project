function inputDomainObjects(jsonDomainList) {
  let filterDataObj = JSON.parse(jsonDomainList)
  console.log(filterDataObj)
  return filterDataObj
}

function drawDomainFilterTable(filterDataObj) {

  createHeaderV2()
  createTableBody(filterDataObj)
  // drafFileFilterTable(filterDataObj)
}
