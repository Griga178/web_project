// клиент запрашивает у сервера данные для фильтра

// ├── filter_data: {}
// │   ├──  domain_list: []
// │   │   ├──  domain: {}
// │   │   │   ├──  domain_id: str
// │   │   │   ├──  domain_name: str
// │   ├──  date_start: str
// │   ├──  date_end: str

function getDataForFilter() {
  let filterData = {}
  return filterData
}
let filterData = {
  "domain_list": [{"id":1, "domain_name": "citilink.ru"},
                {"id":2, "domain_name": "dns.ru"}
                {"id":3, "domain_name": "xcom.ru"},
                {"id":4, "domain_name": "onlinetrade.ru"},],
  "date_start": "22.08.2022",
  "date_end": "05.09.2022"
}

function fillFilterBlock(filterData) {

}

// пользователь формирует запрос для сервера
// ├── filteredQuery: {}
// │   ├──  domain_list: []
// │   │   │   ├──  domain_id: str
// │   ├──  start_date: str
// │   ├──  last_date: str
// │   ├──  check_status: int(0 / 1 / 2)

function readFilteredQuery(){
  filteredQuery = {}
  return filteredQuery
}

// сервер присылает список подходящих результатов
let srvListResponce = ['3', '4', '5', '6', '8']

// клиент делит список на части и запрашивает результаты по частям
let separatedList = [
                    ['3', '4', '5'],
                    ['6', '8']
                  ]
function separateResponceList(srvListResponce){
  let separatedList = []
  return separatedList
}
