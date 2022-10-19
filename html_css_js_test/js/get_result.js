// ДАННЫЕ ОТ СЕРВЕРА
// ├── Response list: []
// │   ├──  dict: {}
// │   │   ├── 'result_id': int
// │   │   ├── 'parsing_date': str
// │   │   ├── 'link': str
// │   │   ├── 'domain_name': str
// │   │   ├── 'product_name': str
// │   │   ├── 'price': float
// │   │   ├── 'screen_file': -- base 64 file - str
// │   │   ├── 'check_status': bool


let results_from_srv = [{
    "result_id": 3 "parsing_date": '22.08.2022',
    'link': 'https://citilink.ru',
    'domain_name': 'citilink.ru',
    'product_name': 'Пневматический очиститель',
    'price': 269,
    "src_name": 'images/grey_kitten.jpg'
    "check_status": false
  },
  {
    "result_id": 4 "parsing_date": '22.09.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Баллон со сжатым воздухом',
    'price': 334.53,
    "src_name": 'images/4.jpg'
    "check_status": false
  },
  {
    "result_id": 5 "parsing_date": '22.09.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Пневматический очиститель',
    'price': 304,
    "src_name": 'images/5.jpg'
    "check_status": false
  },
  {
    "result_id": 6 "parsing_date": '22.08.2022',
    'link': 'https://google.ru',
    'domain_name': 'citilink.ru',
    'product_name': 'Пневматический очиститель',
    'price': 181,
    "src_name": 'images/6.jpg'
    "check_status": false
  },
  {
    "result_id": 8 "parsing_date": '22.08.2022',
    'link': 'https://google.ru',
    'domain_name': 'citilink.ru',
    'product_name': 'Коврик для мыши',
    'price': 209,
    "src_name": 'images/8.jpg'
    "check_status": false
  }
]

// ├── query_to_srv: {}
// │   ├──  domain_id: list def = 0
// │   ├──  check_status: int (0все/1проверены/2нет) def = 0
// │   ├──  date_start: str def = 0
// │   ├──  date_end: str def = 0

function get_result(filtered_qery) {

  return results_from_srv
}

function create_query() {
  let query_to_srv = {}
  return query_to_srv
}