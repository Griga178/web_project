function inputDomainObjects(jsonDomainList) {
  let filterDataObj = JSON.parse(jsonDomainList)
  console.log(filterDataObj)
  return filterDataObj
}



let tableKeys = {
  "filters": [

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
function drawDomainFilterTable(filterDataObj) {

  createHeaderV2()
  // createTableBody(filterDataObj)
  drawTableVerSecond(tableKeys, filterDataObj, 'domainFilterTable')

}
let foreignFilterFile = {
  "foreignKey": "files_id_list",
  "primaryKey": "id",
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
  let foreignFilterPath = {
    "foreignKey": "path_id_set", // нужен новый запрос - инфа из БД
    "primaryKey": "id",
    "columns": [
      {
        "name": "Название Части",
        "searchBy": searchInputText,
        "dataKey": "name",
        "dataFunc": false,
      },
      {
        "name": "Дата загрузки",
        "searchBy": searchInputText,
        "dataKey": "upload_date",
        "dataFunc": false,
      },
    ]
}
// tableKeys.filters.push(foreignFilterFile)
// tableKeys.filters.push(foreignFilterPath)
