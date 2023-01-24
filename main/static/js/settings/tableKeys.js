// Тут описание таблиц которые надо отрисовать
let mainTableKeys = {
  "htmlTableId": "domainFilterTable",
  "dataArray": readJsonFromSrv(filterDataObj),
  "rowFunc": "loadDomainSetting(this)", // при нажатии на строку срабатывает эта ф-я
  //
  "foreignConnection": [
    "files_id_list",
    "parts_id_list"
  ],
  "filterName": "",

  "columns": [
    { "name": "Домен",
      "searchBy": searchInputText,
      "dataKey": "name"},
    { "name": "Кол-во ссылок (всего)",
      "searchBy": searchInputNumbFrom, //numbBetween
      "dataKey": "links_ammount"},
    { "name": "Настройки шт",
      "searchBy": searchInputNumbFrom, //numbBetween
      "dataKey": "domain_setts_ammount"},
    { "name": "Компания",
      "searchBy": searchInputText,
      "dataKey": "company"}
  ]
}

let foreignFilterFilev2 = {
  "htmlTableId": "fileFilterTable",
  "dataArray": readJsonFromSrv(fileFilterObjArray),
  "foreignConnection": ["parts_id_list"],
  "filterName": "files_id_list",

  "columns": [
    { "name": "Название файла",
      "searchBy": searchInputText,
      "dataKey": "name"},
    { "name": "Дата загрузки",
      "searchBy": searchInputText,
      "dataKey": "upload_date"},
  ]
}

let foreignFilterPart = {
  "htmlTableId": "partFilterTable",
  "dataArray": readJsonFromSrv(partFilterObjArray),
  "foreignConnection": ["files_id_list"],
  "filterName": "parts_id_list",

  "columns": [
    {
      "name": "Название части",
      "searchBy": searchInputText,
      "dataKey": "name",
    }
  ]
}


drawTable(mainTableKeys)
drawTable(foreignFilterFilev2)
drawTable(foreignFilterPart)
