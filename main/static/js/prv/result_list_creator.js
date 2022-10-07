// ЭТО ИДЕТ С СЕРВЕРА ПОСЛЕ ФИЛЬТРА
// ├── object_of_results {}
// │   ├── result_id {}
// │   │   ├── 'domain_name': domain_name
// │   │   ├── 'link': link
// │   │   ├── 'parsing_date': str("%d/%m/%Y")
// │   │   ├── 'price': float(*)
// │   │   ├── 'product_name': str(*) \ false
// │   │   ├── 'product_not_avaliable': true \ false
// │   │   ├── 'user_changed': true \ false \ null

function draw_list_of_result (object_of_results) {
  // console.log(object_of_results)
  for (result_id in object_of_results) {
    let res_obj = object_of_results[result_id]
    let new_li = document.createElement('li')
    new_li.innerHTML = `${result_id} - ${res_obj.domain_name}`
    filtered_reaults.appendChild(new_li)
  }
  draw_current_result(object_of_results[1])
}
