// ПРИ НАЖАТИИ "КНОПКИ" С ЭТОЙ ФУНКЦИЕЙ
// ЧИТАЮТСЯ ПАРАМЕТРЫ САМОЙ КНОПКИ
// ИЗМЕНЯЮТСЯ ПАРАМЕТРЫ СВЯЗАННЫХ ОБЪЕКТОВ
// ОБНОВЛЯЮТСЯ СТИЛИ ВСЕХ ОБЪЕКТОВ updateRowVisible()

function filterSelection(tableRowObj) {
  // таблица в которой находится данный фильтр - кнопка
  let currentTable = tableRowObj.parentNode.parentNode
  // по какому id будем фильтровать
  let rowId = tableRowObj.dataset.primarykey
  //  - - - - - СОСТАВЛЯЕМ СПИСОК АКТИВНЫХ ID - - - - -
  let chosenKeys = getChosenKeys(currentTable) // Выбранные id

  if (chosenKeys.indexOf(rowId) === -1) {     // Добавляем id
    chosenKeys.push(rowId)
  // let showAllBtn = currentTable.getElementsByClassName("active_btn");
  let showAllBtn = currentTable.querySelectorAll("[data-primarykey='0']");
  if (showAllBtn) showAllBtn[0].className = showAllBtn[0].className.replace(" active_btn", "");
  tableRowObj.className += " active_btn";
  }
  else {                                      // Удаляем id
    removeItemOnce(chosenKeys, rowId)
    tableRowObj.className = tableRowObj.className.replace(" active_btn", "");
  }

  currentTable.dataset.chosenkeys = chosenKeys;
  // console.log("Искомые строки:", chosenKeys)

  //  - - - - - ОСТАВЛЯЕМ В ДОКУМЕНТЕ ТОЛЬКО ОБЪЕКТЫ ИЗ СПИСКА ВЫБРАННЫХ ID - - - - -
  // находим строки на которые распростроняется фильтр
  let filterNameText = tableRowObj.dataset.filtername // название фильтра
  let rowArray = document.querySelectorAll(`[data-${filterNameText}]`);
  for (i = 0; i < rowArray.length; i++) {
    let rowIdFilesArr = rowArray[i].dataset[filterNameText]
    if (rowIdFilesArr) {
      let intersection = chosenKeys.filter(x => rowIdFilesArr.includes(x));
      // если есть пересечение то оставляем строки
      if (Boolean(intersection.length)){
        rowArray[i].dataset.displayrow = '1'
      }
      else {
        rowArray[i].dataset.displayrow = '0'
      }
    }
    updateRowVisible(rowArray[i]) // скрытие/показ строки
  }
}

function getChosenKeys(tableObject) {
  let chosenKeysArray = tableObject.dataset.chosenkeys // выбранные id
  let chosenKeys = []
  if (chosenKeysArray) {
    chosenKeys = chosenKeysArray.split(",")
  }
  return chosenKeys
}

function choseAll(firstRowObj) {
  // таблица в которой находится данный фильтр - кнопка
  let currentTable = firstRowObj.parentNode.parentNode
  // обнуляем список активированных фильтров
  currentTable.dataset.chosenkeys = "";
  // обновляем видимость отфильтрованных элементов
  let filterNameText = firstRowObj.dataset.filtername // название фильтра
  let rowArray = document.querySelectorAll(`[data-${filterNameText}]`);
  // console.log(rowArray.length)
  for (i = 0; i < rowArray.length; i++) {
    let rowIdFilesArr = rowArray[i].dataset[filterNameText]
    // console.log(rowArray[i])
    if (rowIdFilesArr) {
      rowArray[i].dataset.displayrow = '1'
    }
    updateRowVisible(rowArray[i]) // скрытие/показ строки
  }


  // убираем "активный стиль из других кнопок"
  let activeBtnArray = currentTable.getElementsByTagName('tr')
  // console.log("Список обнуления:", activeBtnArray)
  for (i in activeBtnArray) {
    if (activeBtnArray[i].className) {
      // console.log(activeBtnArray[i])
      if (activeBtnArray[i].className.indexOf(" active_btn") !== -1) {
        activeBtnArray[i].className = activeBtnArray[i].className.replace(" active_btn", "");
      }
    }
  }
  // отмечаем кнопку актвиной
  firstRowObj.className += " active_btn";
}
