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
// │   │   ├── 'screen_path': screen_path

// ├── filtered_results_id []
// │   ├── result_id,...

function draw_filter_bar(object_of_results){
  let filtered_object = create_filter_object(object_of_results)

  for (domain in filtered_object.domain_name) {
    let new_li = document.createElement('li')
    let new_label = document.createElement('label')
    new_label.setAttribute('for', `inp_${domain}`)
    let new_input = document.createElement('input')
    new_input.setAttribute('id', `inp_${domain}`)
    new_input.setAttribute('type', 'checkbox')
    let new_span = document.createElement('span')
    new_span.innerHTML = `${domain} - (${filtered_object.domain_name[domain].length} шт.)`
    new_li.appendChild(new_label)
    new_label.appendChild(new_span)
    new_label.appendChild(new_input)
    flt_by_domain.appendChild(new_li)
  }
  for (p_date in filtered_object.parsing_date) {
    let new_li = document.createElement('li')
    new_li.innerHTML = `${p_date} - (${filtered_object.parsing_date[p_date].length} шт.)`
    flt_by_date.appendChild(new_li)
  }

  filter_btn.onclick = () => {

    let filtered_results_id = read_parametres()
    // let object_of_results = query_to_srv(filtered_results_id)
    draw_list_of_result(object_of_results)
  }

}

// ЭТО ИДЕТ СРАЗУ С СЕРВЕРА
// ├── filtered_object {}
// │   ├── "domain_name": {}
// │   │   ├── domain_name: []
// │   │   │   ├──  result_id, ...
// │   ├── "parsing_date": {}
// │   │   ├── parsing_date: []
// │   │   │   ├──  result_id, ...
// │   ├── product_not_avaliable: []
// │   │   ├── result_id, ...
// │   ├── user_changed: []
// │   │   ├── result_id, ...

// ПЕРЕБРОСИТЬ ПОДГОТОВКУ ФИЛЬТРА НА СЕРВЕР - ЧТО БЫ ВЫВОДИТЬ ДО N ЗНАЧЕНИЙ
function create_filter_object(object_of_results){
  let filtered_object = {}
  for (res_id in object_of_results){
    let curr_result = object_of_results[res_id]
    if (!filtered_object['domain_name']) filtered_object['domain_name'] = {}
    if (!filtered_object['domain_name'][curr_result.domain_name]) {
      filtered_object['domain_name'][curr_result.domain_name] = []
    }
    filtered_object['domain_name'][curr_result.domain_name].push(res_id)

    if (!filtered_object['parsing_date']) filtered_object['parsing_date'] = {}
    if (!filtered_object['parsing_date'][curr_result.parsing_date]) {
      filtered_object['parsing_date'][curr_result.parsing_date] = []
    }
    filtered_object['parsing_date'][curr_result.parsing_date].push(res_id)

    if (!filtered_object['product_not_avaliable']) filtered_object['product_not_avaliable'] = []
    if (object_of_results[res_id].product_not_avaliable) filtered_object['product_not_avaliable'].push(res_id)

    if (!filtered_object['user_changed']) filtered_object['user_changed'] = []
    if (object_of_results[res_id].user_changed) filtered_object['user_changed'].push(res_id)
  }

  // console.log(filtered_object)
  // console.log(object_of_results)
  return filtered_object
}
