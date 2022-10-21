// клиент запрашивает данные для фильтра у сервера
// ├── filter_data: {}
// │   ├──  domain_list: []
// │   │   ├──  domain: {}
// │   │   │   ├──  id: str
// │   │   │   ├──  domain_name: str
// │   │   │   ├──  result_amount: str
// │   ├──  date_start: str
// │   ├──  date_end: str

function getDataForFilter() {
  dataForFilter = filterData
  fillFilterBlock(filterData)

}

function fillFilterBlock(filterData) {
  startDateString = filterData["date_start"]
  endDateString = filterData["date_end"]
  startDate.setAttribute("min", filterData["date_start"])
  startDate.setAttribute("max", filterData["date_end"])
  startDate.setAttribute("value", filterData["date_start"])
  endDate.setAttribute("min", filterData["date_start"])
  endDate.setAttribute("max", filterData["date_end"])
  endDate.setAttribute("value", filterData["date_end"])

  for (indX in filterData["domain_list"]){

    let domainRow = document.createElement("section");
    domainRow.setAttribute("class", 'shop_row')
    let domainContent = document.createElement('span');
    domainContent.setAttribute('class', 'text_span')
    domainContent.setAttribute('data-id', `${filterData["domain_list"][indX].id}`)
    domainContent.setAttribute('onclick', `appendDomainToQuery(this)`)

    domainContent.innerHTML = `${filterData["domain_list"][indX].domain_name} (${filterData["domain_list"][indX].result_amount})`;

    domainRow.appendChild(domainContent);
    domainList.appendChild(domainRow);
  }
}
