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


let results_from_srv = [
  {
    "result_id": 3
    "parsing_date": '22.08.2022',
    'link': 'https://citilink.ru',
    'domain_name': 'citilink.ru',
    'product_name': 'Пневматический очиститель',
    'price': 269,
    "src_name": 'images/grey_kitten.jpg'
    "check_status": false
  },
  {
    "result_id": 4
    "parsing_date": '22.09.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Баллон со сжатым воздухом',
    'price': 334.53,
    "src_name": 'images/4.jpg'
    "check_status": false
  },
  {
    "result_id": 5
    "parsing_date": '22.09.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Пневматический очиститель',
    'price': 304,
    "src_name": 'images/5.jpg'
    "check_status": false
  },
  {
    "result_id": 6
    "parsing_date": '22.08.2022',
    'link': 'https://google.ru',
    'domain_name': 'citilink.ru',
    'product_name': 'Пневматический очиститель',
    'price': 181,
    "src_name": 'images/6.jpg'
    "check_status": false
  },
  {
    "result_id": 8
    "parsing_date": '22.08.2022',
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

function get_result(filtered_qery){

  return results_from_srv
}

function create_query(){
  let query_to_srv = {}
  return query_to_srv
}

// 1 пользователь открывает РЕЗУЛЬТАТЫ
// 2 клиент запрашивает данные у сервера для заполнения ФИЛЬТРА
// 3 клиент получает список для ФИЛЬТРА заполняет ЕГО
// 4 пользователь в ФИЛЬТРЕ формирует запрос для поиска РЕЗУЛЬТАТОВ
// 5 клиент делает запрос получаает список РЕЗУЛЬТАТОВ
// 6 клиент разделяет список Р. на части возвращает список списков
// 7 клиент создает генератор списка
// 8 клиент запрашивает данные РЕЗУЛЬТАТОВ по списку ID
// 9 клиент заполняет блоки РЕЗУЛЬТАТ + СПИСОК
// 10 пользователь пролистывает РЕЗУЛЬТАТЫ
// 11 клиент на каждом результате меняет статус - "Проверен - 2"
// 12 клиент на выбранных результатах меняет цены
// 13 пользователь долистал до конца
// 14 клиент обращается к функции с итератором === 14
// 15 клиент запрашывает у сервера данные по второй части === 15
// 16 клиент очищает данные первой части результатов - (Повтор)
// 17 клиент вызывает событие об окончании списка

// 1 -
// 2 - getDataForFilter() --> filterData {}
// 3 - fillFilterBlock(filterData)
// 4 - readFilteredQuery() --> filteredQuery {}
// 5 - getResultInfo(filteredQuery) --> srvListResponce []
// 6 - separateResponceList(srvListResponce) --> separatedList [ [],... ]
// 7 - generateSequence(separatedList) *--> listPart []
// 8 - getResulData(listPart) --> resultData {}
// 9 - fillResultBlock(resultData)


// 1 - активируется пользователем
// 2 - прописана в HTML
// 3 - активируется ф-ей № 2
// 4 - активируется пользователем
// 5 - активируется ф-ей № 4
// 6 - активируется ф-ей № 5
// 7* - активируется ф-ей № 6 генератор
// 8 - активируется ф-ей* № 7
// 9 - активируется ф-ей № 8
