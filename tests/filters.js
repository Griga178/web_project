// создать @property к Таблице SQL
// которая выводит json object

let linkObj_1 = {
  'id' = 1,
  'link' = 'https://www.citilink.ru/product/smartfon-huawei-nova-y70-128gb-8gb-goluboi-perlamutr-3g-4g-6-57-1080x2-1769864/',
  'id_domain' = false,
  'file_kkn_links' = [] // fileKknLink_obj_1
}

let domainSettingObj_1 = {
  'id' = 1,
  'id_domain' = false,
  'setting_name' = 'Name',
  'setting_content' = 'div;class;price'
}
let domainObject = {
  'id' = 1,
  'name' = 'citilink.ru',
  'id_company' = false,
  'links' = [linkObj_1],
  'id_domain_sett' = [domainSettingObj_1],
}

linkObj_1.id_domain = domainObject
domainSettingObj_1.id_domain = domainObject

function
