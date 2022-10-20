// пользователь формирует запрос для сервера
// ├── filteredQuery: {}
// │   ├──  domain_list: []
// │   │   │   ├──  domain_id: str
// │   ├──  start_date: str
// │   ├──  end_date: str
// │   ├──  only_last: bool
// │   ├──  get_checked: bool
// │   ├──  get_unchecked: bool

function readFilteredQuery(){
  filteredQuery = {}
  filteredQuery['domain_list'] = listDomainId
  filteredQuery['start_date'] = startDate.value
  filteredQuery['end_date'] = endDate.value
  filteredQuery['only_last'] = lastResult.checked
  filteredQuery['get_checked'] = onlyCheckedTrue.checked
  filteredQuery['get_unchecked'] = onlyCheckedFalse.checked
  // return filteredQuery
  console.log(filteredQuery)
}

function domainFilter(){
  let filter = searchDomain.value.toUpperCase();
  let shopList = domainList.getElementsByTagName('section')
  for (i = 0; i < shopList.length; i++) {
    txtValue = shopList[i].textContent || shopList[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      shopList[i].style.display = "";
    } else {
      shopList[i].style.display = "none";
    }
  }
}

function appendDomainToQuery(domainSpanObj){
  let domainId = domainSpanObj.getAttribute('data-id')
  listDomainId.push(domainId)
  domainSpanObj.setAttribute('onclick', `deleteDomainFromQuery(this)`)
  console.log(listDomainId)
}
function deleteDomainFromQuery(domainSpanObj){
  let domainId = domainSpanObj.getAttribute('data-id')
  // удаляем ID из списка
  let indexDelElem = listDomainId.indexOf(domainId)
  listDomainId.splice(indexDelElem, 1)
  domainSpanObj.setAttribute('onclick', `appendDomainToQuery(this)`)
  console.log(listDomainId)
}
