// пользователь формирует запрос для сервера
// ├── filteredQuery: {}
// │   ├──  domain_list: []
// │   │   │   ├──  domain_id: str
// │   ├──  start_date: str
// │   ├──  end_date: str
// │   ├──  only_last: bool
// │   ├──  get_checked: bool
// │   ├──  get_unchecked: bool
// пока не реализован
// │   ├──  get_with_out_price: bool

function readFilteredQuery(){
  filteredQuery = {}
  filteredQuery['domain_list'] = listDomainId
  filteredQuery['start_date'] = startDate.value
  filteredQuery['end_date'] = endDate.value
  filteredQuery['only_last'] = lastResult.checked
  filteredQuery['get_checked'] = onlyCheckedTrue.checked
  filteredQuery['get_unchecked'] = onlyCheckedFalse.checked
  // filteredQuery['get_with_out_price'] = withOutPrice.checked
  return filteredQuery
}

function getResultList() { // onclick в HTML ФОРМЕ
  let filteredQueryObject = readFilteredQuery()
  let filteredQuery = JSON.stringify(filteredQueryObject)
  console.log(filteredQuery)
  // получает список id результатов
  $.ajax({
    url: `/filtered_results`,
    contentType: 'application/json',
    type: 'POST',
    dataType : 'json',
    data: filteredQuery,
    success: function(response) {
      listResultId = response
      console.log(listResultId)
      fillListBlock()
      changeResult(listResultId[0])
    }
  })
}
