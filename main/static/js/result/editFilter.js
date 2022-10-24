
function domainFilter(){
  let filter = searchDomainInput.value.toUpperCase();
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
  domainSpanObj.setAttribute("class", "text_span chosen")
  domainSpanObj.setAttribute('onclick', `deleteDomainFromQuery(this)`)
}
function deleteDomainFromQuery(domainSpanObj){
  let domainId = domainSpanObj.getAttribute('data-id')
  // удаляем ID из списка
  let indexDelElem = listDomainId.indexOf(domainId)
  listDomainId.splice(indexDelElem, 1)
  domainSpanObj.setAttribute("class", "text_span")
  domainSpanObj.setAttribute('onclick', `appendDomainToQuery(this)`)
}
