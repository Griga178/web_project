let filterData = {
  "domain_list": [{"id":1, "domain_name": "citilink.ru", 'result_amount': 1},
                {"id":2, "domain_name": "dns.ru", 'result_amount': 1},
                {"id":3, "domain_name": "xcom.ru", 'result_amount': 1},
                {"id":4, "domain_name": "onlinetrade.ru", 'result_amount': 1},
                {"id":5, "domain_name": "computermarket.ru", 'result_amount': 1},
                {"id":6, "domain_name": "delo.spb.ru", 'result_amount': 1}],
  "date_start": "2022-08-22",
  "date_end": "2022-09-05"
}

let testListResultId = ['3', '4', '5', '6', '8']

// ├── testResultObj {}
// │   ├── result_id {}
// │   │   ├── 'id': int
// │   │   ├── 'parsing_date': str("%d/%m/%Y")
// │   │   ├── 'link': link
// │   │   ├── 'domain': domain_name
// │   │   ├── 'name': str(*) \ false
// │   │   ├── 'price': float(*)
// │   │   ├── 'avaliable': true \ false
// │   │   ├── 'src_name': float(*)
// │   │   ├── 'checked': true \ false

let testResultObj = {
  3: {
    'id': 3,
    "parsing_date": '22.08.2022',
    'link': 'https://onlinetrade.ru',
    'domain': 'onlinetrade.ru',
    'name': 'Пневматический очиститель',
    'price': 269,
    'avaliable': true,
    "src_name": 'images/3.jpg',
    'checked': true
  },
  4: {
    'id': 4,
    "parsing_date": '22.09.2022',
    'link': 'https://dns.ru',
    'domain': 'dns.ru',
    'name': 'Баллон со сжатым воздухом',
    'price': 334.53,
    'avaliable': true,
    "src_name": 'images/4.jpg',
    'checked': true
  },
  5: {
    'id': 5,
    "parsing_date": '03.02.2022',
    'link': 'https://google.ru',
    'domain': 'dns.ru',
    'name': 'Пневматический очиститель',
    'price': 304,
    'avaliable': true,
    "src_name": 'images/5.jpg',
    'checked': true
  },
  6: {
    'id': 6,
    "parsing_date": '22.08.2022',
    'link': 'https://google.ru',
    'domain': 'dns.ru',
    'name': 'Пневматический очиститель',
    'price': 181,
    'avaliable': true,
    "src_name": 'images/6.jpg',
    'checked': true
  },
  8: {
    'id': 8,
    "parsing_date": '22.08.2022',
    'link': 'https://citilink.ru',
    'domain': 'citilink.ru',
    'name': 'Коврик для мыши',
    'price': 209,
    'avaliable': true,
    "src_name": 'images/8.jpg',
    'checked': true
  }
}
