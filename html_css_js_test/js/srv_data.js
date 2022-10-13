// ├── js_obx_from_srv {}
// │   ├── result_id {}
// │   │   ├── 'domain_name': domain_name
// │   │   ├── 'link': link
// │   │   ├── 'parsing_date': str("%d/%m/%Y")
// │   │   ├── 'price': float(*)
// │   │   ├── 'product_name': str(*) \ false
// │   │   ├── 'product_not_avaliable': true \ false
// │   │   ├── 'user_changed': true \ false \ null

let paring_result = {
  1: {
    "parsing_date": '01.02.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Серый котенок',
    'price': 1200,
    'result_id': 1,
    "src_name": 'images/grey_kitten.jpg'
  },
  2: {
    "parsing_date": '02.02.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Рыжий котенок',
    'price': 1250,
    'result_id': 2,
    "src_name": 'images/red_kitten.jpg'
  },
  3: {
    "parsing_date": '03.02.2022',
    'link': 'https://google.ru',
    'domain_name': 'dns.ru',
    'product_name': 'Белый котенок',
    'price': 1230,
    'result_id': 3,
    "src_name": 'images/white_kitten.jpg'
  }
}