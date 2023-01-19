function inputDomainObjects(jsonDomainList) {
  let filterDataObj = JSON.parse(jsonDomainList)
  // console.log(filterDataObj)
  return filterDataObj
}

function readJsonFromSrv(jsonObject) {
  return JSON.parse(jsonObject)
}

let tableKeys = {
  "htmlTableId": "domainFilterTable",
  "foreignFilters": [
    "files_id_list",
    "path_id_set"
  ],
  "columns": [
    {
      "name": "Домен",
      "searchBy": searchInputText,
      "dataKey": "name",
    },
    {
      "name": "Кол-во ссылок (всего)",
      "searchBy": searchInputNumbFrom, //numbBetween
      "dataKey": "links_ammount",
    },
    {
      "name": "Настройки (есть/нет)",
      "searchBy": searchInputNumbFrom, //numbBetween
      "dataKey": "domain_setts_ammount",
    },
    {
      "name": "Компания",
      "searchBy": searchInputText,
      "dataKey": "company",
    }
  ]
}
let foreignFilterFile = {
  "filterKey": "files_id_list",
  "columns": [
    {
      "name": "Название файла",
      "searchBy": searchInputText,
      "dataKey": "name",
    },
    {
      "name": "Дата загрузки",
      "searchBy": searchInputText,
      "dataKey": "upload_date",
    },
  ]
}
function drawDomainFilterTable(filterDataObj) {

  // createHeaderV2()
  // createTableBody(filterDataObj)
  createHeaderV3(tableKeys, 'domainFilterTable')
  drawTableVerSecond(tableKeys, filterDataObj, 'domainFilterTable')
  // createHeaderV3(foreignFilterFile, 'fileFilterTable')
  // drawTableVerSecond(foreignFilterFile, foreignFilterdataObj, 'fileFilterTable')

}

  let foreignFilterPath = {
    "filterKey": "path_id_set",
    "primaryKey": "id",
    "columns": [
      {
        "name": "Название Части",
        "searchBy": searchInputText,
        "dataKey": "name",
      },
      {
        "name": "Дата загрузки",
        "searchBy": searchInputText,
        "dataKey": "upload_date",
      },
    ]
}
// tableKeys.filters.push(foreignFilterFile)
// tableKeys.filters.push(foreignFilterPath)
