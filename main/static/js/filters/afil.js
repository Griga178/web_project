// myFunction убирает строки в которых нет искомого значения
// sortTable сортирует строки по выбранномустолбцу

function myFunction(domainInputID) {
  // Declare variables
  var filter, tr, td, i, txtValue;
  let domainInput = document.getElementById(domainInputID)
  let cellIDSplit = domainInputID.split('_');
  let cellID = cellIDSplit[cellIDSplit.length - 1]

  // console.log(cellID)
  filter = domainInput.value.toUpperCase();
  tr = domainFilterTable.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    let td_array = tr[i].getElementsByTagName("td") // Список ячеек в строке
    td = tr[i].getElementsByTagName("td")[cellID]; // ячейка в которой ищем
    let rowDisplayArray = [] // массив для определения display

    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        td.dataset.filtered = "0"
      } else {
        // если неудачный поиск помечаем ячейку
        td.dataset.filtered = "1"
      }
      for (clmnIndex in td_array) {
        if (td_array[clmnIndex].dataset) {
        rowDisplayArray.push(td_array[clmnIndex].dataset.filtered)
        }
      }
      if (rowDisplayArray.indexOf("1") != -1){
        tr[i].style.display = "none";
      }
      else {
        tr[i].style.display = "";
      }
    }
  }
}

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


function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
