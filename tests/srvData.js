let linkObj_1 = {  "id": 1,  'link': 'https://www.citilink.ru/product/smartfon-huawei-nova-y70-128gb-8gb-goluboi-perlamutr-3g-4g-6-57-1080x2-1769864/',
  'domain_obj': false,  'file_kkn_links': []}
let linkObj_2 = {  "id": 2,  'link': 'https://www.citilink.ru/product/smartfon-huawei-p-smart-2021-zelenyi-1458769/',
  'domain_obj': false,  'file_kkn_links': [] } // fileKknLink_obj_1
let linkObj_3 = {  "id": 3,  'link': 'https://www.dns.ru/product/smartfon-huawei-p-smart-2021-zelenyi-1080x2/fail-link',
  'domain_obj': false,  'file_kkn_links': [] }
let linkObj_4 = {  "id": 4,  'link': 'https://www.dns.ru/product/smartfon-huawei-p-smart-2021-zelenyi-1458769/fail-link',
  'domain_obj': false,  'file_kkn_links': [] }

let domainSettingObj_1 = {  'id': 1,  'id_domain': false,  'setting_name': 'Price',  'setting_content': 'div;class;price'}
let domainSettingObj_2 = {  'id': 2,  'id_domain': false,  'setting_name': 'Name',  'setting_content': 'div;class;name'}
let domainSettingObj_3 = {  'id': 3,  'id_domain': false,  'setting_name': 'Price',  'setting_content': 'span;class;price'}
let domainSettingObj_4 = {  'id': 4,  'id_domain': false,  'setting_name': 'Name',  'setting_content': 'span;class;name'}

let domainObject_1 = {  'id': 1,  'name': 'citilink.ru',  'id_company': false,
  'links': [linkObj_1, linkObj_2],  'id_domain_sett': [domainSettingObj_1, domainSettingObj_2],}
let domainObject_2 = {  'id': 2,  'name': 'dns.ru',  'id_company': false,
  'links': [linkObj_3, linkObj_4],  'id_domain_sett': [domainSettingObj_3, domainSettingObj_4],}

let file_kkn_link_1 = {  "id": 1,  "id_file": 1,  "id_link": 1,
  "id_kkn": 1,  "id_source_type": 1,
  "source_date": new Date("2022-01-01"),  "source_number": "01-001/23-0-0"}
let file_kkn_link_2 = {  "id": 2,  "id_file": 1,  "id_link": 2,
  "id_kkn": 1,  "id_source_type": 1,
  "source_date": new Date("2022-01-01"),  "source_number": "01-001/23-0-0"}

// добавляем "связи"
linkObj_1.domain_obj = domainObject_1
linkObj_2.domain_obj = domainObject_1
linkObj_3.domain_obj = domainObject_2
linkObj_4.domain_obj = domainObject_2

domainSettingObj_1.id_domain = domainObject_1
domainSettingObj_2.id_domain = domainObject_1
domainSettingObj_3.id_domain = domainObject_1
domainSettingObj_4.id_domain = domainObject_1
