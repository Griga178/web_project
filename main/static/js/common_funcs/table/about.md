создание таблиц по словарям json

{
  "htmlTableId": "domainFilterTable",           - id заполняемой таблицы
  "dataArray": readJsonFromSrv(filterDataObj),  - данные от сервера
  "rowFunc": "loadDomainSetting(this)",         - onclick функция для строки
  "foreignConnection": [                        - спиок id связанных строк
    "files_id_list",                            -
    "parts_id_list"
  ],
  "filterName": "",                             - ключ для таблицы - фильтра

  "columns": [                                  - колонки
    { "name": "Домен",                          - имя
      "searchBy": searchInputText,              - тип функции поиска
      "dataKey": "name"},                       - ключ от данных сервера
    { "name": ...},
    ...
  ]
}

{
  "htmlTableId": "fileFilterTable",                 - ...
  "dataArray": readJsonFromSrv(fileFilterObjArray),           - ...
  "rowFunc": "filterSelection(this)",               - активировать фильтр

  "foreignConnection": ["parts_id_list"],           - ...
  "filterName": "files_id_list",                - название фильтра

  "columns": [...
}

drawTable(jsonObject) - рисует таблицу


нажатие на строку в таблице фильтра => filterSelection(this)
  инфа из строки:
    ключ фильтра ""
    список активированных ключей [""] (из таблицы - родителя)
    список строк для фильтрации [obj]

  действия:
   добавляется/удаляется ключ из общего списка
   фильтруются строки, которые не пересекаются со списком активированных ключей (data = 0 => display: none)
   кнопка получает/лишается стиль "active_btn"
   кнопка "Выбрать все" лишается стиля "active_btn"
