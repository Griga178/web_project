// columnSearchText убирает строки в которых нет искомого значения
// columnFilterNumbFrom убирает строки в число >= искомого значения
// columnFilterNumbTo убирает строки в число <= искомого значения
// sortTable сортирует строки по выбранномустолбцу

function columnSearchText(inputElement){
  let columnIdSplit = inputElement.id.split('_');
  let columnId = columnIdSplit[columnIdSplit.length - 1] // Номер столбца
  let filter = inputElement.value.toUpperCase(); // Введенное значение
  let tr = domainFilterTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[columnId]; // ячейка в которой ищем
    if (td) {
      let txtValue = td.textContent || td.innerText; // содержимое ячейки
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        // удачный поиск
        td.dataset.showCell = "1"
      } else {
        // неудачный поиск
        td.dataset.showCell = "0"
      }
      updateRowVisible(tr[i]) // скрытие/показ строки
    }
  }
}

function columnFilterNumbFrom(inputElement){
  let columnIdSplit = inputElement.id.split('_');
  let columnId = columnIdSplit[columnIdSplit.length - 1] // Номер столбца
  let filter = parseInt(inputElement.value); // Введенное значение
  let tr = domainFilterTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[columnId]; // ячейка в которой ищем
    if (td) {
      let numValue = parseInt(td.textContent) || parseInt(td.innerText); // содержимое ячейки
      if (numValue >= filter || isNaN(filter)) {
        // удачный поиск
        td.dataset.showCell = "1"
      } else {
        // неудачный поиск
        td.dataset.showCell = "0"
      }
      updateRowVisible(tr[i]) // скрытие/показ строки
    }
  }
}

function columnFilterNumbTo(inputElement){
  let columnIdSplit = inputElement.id.split('_');
  let columnId = columnIdSplit[columnIdSplit.length - 1] // Номер столбца
  let filter = parseInt(inputElement.value); // Введенное значение
  let tr = domainFilterTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[columnId]; // ячейка в которой ищем
    if (td) {
      let numValue = parseInt(td.textContent) || parseInt(td.innerText); // содержимое ячейки
      if (numValue <= filter || isNaN(filter)) {
        // удачный поиск
        td.dataset.showCell = "1"
      } else {
        // неудачный поиск
        td.dataset.showCell = "0"
      }
      updateRowVisible(tr[i]) // скрытие/показ строки
    }
  }
}

function updateRowVisible(tableRow) {
  let rowDisplayArray = [] // массив для определения display

  let tdArray = tableRow.getElementsByTagName("td") // все ячейки в строке

  if (tableRow.dataset.fileFiltered === '1'){ // проверка по файлу
    for (cellIndex in tdArray) {
      if (tdArray[cellIndex].dataset) {
      rowDisplayArray.push(tdArray[cellIndex].dataset.showCell)
      }
    }
    if (rowDisplayArray.indexOf("0") != -1){
      // есть ячейки, которые не надо показывать
      hideRow(tableRow)
    }
    else {
      showRow(tableRow)
    }
  }
  else {
    hideRow(tableRow)
  }


}

function hideRow(tableRow) {  tableRow.style.display = "none"}
function showRow(tableRow) {  tableRow.style.display = "table-row"}

// https://v3c.ru/javascript/sort-table
document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table_sort .theadNames').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});

// КНОПОЧНЫЙ ФИЛЬТР

function filterSelection(btnDiv) {
  let idFilesArr = btnDiv.dataset.files.split(',') // id фалов, которые оставляем
  // let idFilesSet = new Set(idFilesArr)

  let tr = domainFilterTable.getElementsByTagName("tr"); // Список строк табл.
  for (i = 2; i < tr.length; i++) {
    let rowIdFilesArr = tr[i].dataset.fileid // id фалов, связанных с доменом

    if (rowIdFilesArr) {
      let intersection = idFilesArr.filter(x => rowIdFilesArr.includes(x));
      // если есть пересечение то оставляем строки
      if (Boolean(intersection.length)){
        tr[i].dataset.fileFiltered = '1'
        // console.log(rowIdFilesArr)
      }
      else {
        tr[i].dataset.fileFiltered = '0'
      }
    }
    updateRowVisible(tr[i]) // скрытие/показ строки
  }

}

// function filterSelection(c) {
//   var x, i;
//   x = document.getElementsByClassName("filterDiv");
//   if (c == "all") c = "";
//   // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
//   for (i = 0; i < x.length; i++) {
//     w3RemoveClass(x[i], "show");
//     if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
//   }
// }

// // Show filtered elements
// function w3AddClass(element, name) {
//   var i, arr1, arr2;
//   arr1 = element.className.split(" ");
//   arr2 = name.split(" ");
//   for (i = 0; i < arr2.length; i++) {
//     if (arr1.indexOf(arr2[i]) == -1) {
//       element.className += " " + arr2[i];
//     }
//   }
// }
//
// // Hide elements that are not selected
// function w3RemoveClass(element, name) {
//   var i, arr1, arr2;
//   arr1 = element.className.split(" ");
//   arr2 = name.split(" ");
//   for (i = 0; i < arr2.length; i++) {
//     while (arr1.indexOf(arr2[i]) > -1) {
//       arr1.splice(arr1.indexOf(arr2[i]), 1);
//     }
//   }
//   element.className = arr1.join(" ");
// }
