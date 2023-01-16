function inputDomainObjects(jsonDomainList) {
  let filterDataObj = JSON.parse(jsonDomainList)
  console.log(filterDataObj)
  return filterDataObj
}
let headers_rules = [
  {    "name": "Домен",
      "sorted": true,    "search": true  },
  {    "name": "Кол-во ссылок (от)",
      "sorted": true,    "search": true  },
  {    "name": "Настройки (есть/нет)",
      "sorted": true,    "search": true  },
]
function drawDomainFilterTable(filterDataObj) {

  createHeaderV2(headers_rules)
  createTableBody(filterDataObj)
}
