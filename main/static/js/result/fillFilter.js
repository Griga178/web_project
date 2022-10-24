// ├── filterDataObj: {}
// │   ├──  'domain_dict': {}
// │   │   ├──  domain_name: {}
// │   │   │   ├──  'id': str
// │   │   │   ├──  'domain_name': str
// │   │   │   ├──  'result_amount': int
// │   ├──  'date_start': "2022-09-05"
// │   ├──  'date_end': "2022-09-05"

function fillFilterBlock(filterData) {
  startDateString = filterData["date_start"]
  endDateString = filterData["date_end"]
  startDate.setAttribute("min", filterData["date_start"])
  startDate.setAttribute("max", filterData["date_end"])
  startDate.setAttribute("value", filterData["date_start"])
  endDate.setAttribute("min", filterData["date_start"])
  endDate.setAttribute("max", filterData["date_end"])
  endDate.setAttribute("value", filterData["date_end"])

  for (domainName in filterData["domain_dict"]){
    let domainInfo = filterData["domain_dict"][domainName]
    let domainRow = document.createElement("section");
    domainRow.setAttribute("class", 'shop_row')
    let domainContent = document.createElement('span');
    domainContent.setAttribute('class', 'text_span')
    domainContent.setAttribute('data-id', `${domainInfo.id}`)
    domainContent.setAttribute('onclick', `appendDomainToQuery(this)`)
    domainContent.innerHTML = `${domainName} (${domainInfo.result_amount})`;
    domainRow.appendChild(domainContent);
    domainList.appendChild(domainRow);
  }
}
