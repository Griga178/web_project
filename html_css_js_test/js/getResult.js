
function getResultList() {
  readFilteredQuery()

  // отправляет на сервер  filteredQuery
  // получает список id результатов
  listResultId = testListResultId

  // console.log(listResultId)
  fillListBlock()
  changeResult(listResultId[0])
}

function getResultData(resultId) {

  // отправляет на сервер  resultId

  // получает данные результата по id
  let resultData = testResultObj[resultId]
  fillResultBlock(resultData)
}

// ├── resultData {}
// │   ├── 'id': int
// │   ├── 'parsing_date': str("%d/%m/%Y")
// │   ├── 'link': link
// │   ├── 'domain': domain_name
// │   ├── 'name': str(*) \ false
// │   ├── 'price': float(*)
// │   ├── 'avaliable': true \ false
// │   ├── 'src_name': float(*)
// │   ├── 'checked': true \ false

function fillResultBlock(resultData) {
  PScreenID.innerHTML = resultData.id
  DomainName.innerHTML = resultData.domain
  Link.innerHTML = `<a href="${resultData.link}" target="blanked">перейти</a>`
  resultDate.innerHTML = resultData.parsing_date
  resultChecked.innerHTML = resultData.checked
  CurrentImageContainer.setAttribute('src', 'images/' + resultData.id + '.jpg')
  spanTextName.innerHTML = resultData.name
  spanTextName.onclick = editName
  spanPriceValue.innerHTML = resultData.price
  spanPriceValue.onclick = editPrice
}

function fillListBlock() {
  resultIdListUl.innerHTML = ""
  for (index in listResultId) {
    let newLi = document.createElement('li')
    newLi.innerHTML = `${listResultId[index]}`
    resultIdListUl.appendChild(newLi)
  }
}
