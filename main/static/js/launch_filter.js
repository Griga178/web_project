let filter_setting = {
    'domain_checkbox': [
      ['1', 'xcom.ru'], ['2', 'citi.ru'], ['3', 'ozon.ru'],
      ['4', 'onla.ru']
    ]
  }

let request_from_server = [
  ['xcom.ru', '12'], ['citi.ru', '22'], ['ozon.ru', '22'],
  ['onla.ru', '14'], ['Всего', '60']
]

accept_btn.onclick = () => {
  let filtered_request = read_parametres()
  alert(JSON.stringify(filtered_request))
  draw_chosen_link_result(request_from_server)
  draw_parser_parametres_filter()
}


function read_parametres(){

  let return_object = {}
  // - * - * - * - * - ищем домены, которые отметили - * - * - * - * -
  let search_name = 'domain_checkbox'
  let checked_domain_boxes = document.querySelectorAll(`input[name=${search_name}]:checked`);


  for (obj in Object.values(checked_domain_boxes)) {
    // - * - * - * - * - берем указанный id домена - * - * - * - * -
    let checked_domain_id = checked_domain_boxes[obj].dataset.domain_id;
    // - * - * - * - * - заполняем словарь выбранных доменов - * - * - * - * -
    if (return_object[search_name]) {
      return_object[search_name].push(checked_domain_id)
    }
    else {return_object[search_name] = [checked_domain_id]}
  };
  // - * - * - * - * - выбор ссылок актуальными ценами - * - * - * - * -
  search_name = 'checkbox_parsed'
  let parsed_checkbox = document.querySelector(`input[name=${search_name}]:checked`)
  if (parsed_checkbox) return_object[search_name] = true
  else return_object[search_name] = false

  // alert(Object.values(return_object))
  // alert(JSON.stringify(return_object))
  return return_object

}

function draw_filter_block(parametres_obj){
  // - * - * - * - * - СПИСОК ДОМЕНОВ - * - * - * - * -
   for (i in parametres_obj['domain_checkbox']) {
     let dom_arr = parametres_obj['domain_checkbox'][i]
     let d_label = document.createElement('label')
     let d_input = document.createElement('input')
     let d_span = document.createElement('span')

     d_span.innerHTML = `${dom_arr[1]}`
     d_label.setAttribute('for', `checkbox_${dom_arr[0]}`)
     d_input.setAttribute('id', `checkbox_${dom_arr[0]}`)
     d_input.setAttribute('type', `checkbox`)
     d_input.setAttribute('name', `domain_checkbox`)
     d_input.setAttribute('data-domain_id', `${dom_arr[0]}`)

     d_label.appendChild(d_input)
     d_label.appendChild(d_span)
     filter_form.appendChild(d_label)
     filter_form.appendChild(document.createElement('br'))
   }
  // - * - * - * - * - АКТУАЛЬный парсинг - * - * - * - * -
  let d_label = document.createElement('label')
  let d_input = document.createElement('input')
  let d_span = document.createElement('span')
  d_span.innerHTML = 'С актуальными ценами (не больше 2 нед.)'
  d_label.setAttribute('for', 'checkbox_parsed')
  d_input.setAttribute('id', 'checkbox_parsed')
  d_input.setAttribute('type', `checkbox`)
  d_input.setAttribute('name', `'checkbox_parsed'`)

  d_label.appendChild(d_input)
  d_label.appendChild(d_span)
  filter_form.appendChild(d_label)
}

function draw_chosen_link_result(request_from_server) {
  tbl_chosen_link.innerHTML = ''
  // шапка
  let tbl_row = document.createElement('tr')
  let tbl_head_name = document.createElement('th')
  let tbl_head_count = document.createElement('th')

  tbl_head_name.innerHTML = 'Домен'
  tbl_head_count.innerHTML = 'Кол-во ссылок'

  tbl_row.appendChild(tbl_head_name)
  tbl_row.appendChild(tbl_head_count)
  tbl_chosen_link.appendChild(tbl_row)


  for (i in request_from_server) {
    let tbl_row = document.createElement('tr')
    let tbl_data_name = document.createElement('td')
    let tbl_data_count = document.createElement('td')
    tbl_data_name.innerHTML = `${request_from_server[i][0]}`
    tbl_data_count.innerHTML = `${request_from_server[i][1]}`

    tbl_row.appendChild(tbl_data_name)
    tbl_row.appendChild(tbl_data_count)
    tbl_chosen_link.appendChild(tbl_row)
  }
}

function draw_parser_parametres_filter() {

  let scr_input = document.createElement('input')
  let scr_prc_input = document.createElement('input')
  scr_prc_input.setAttribute('type', 'radio')
  scr_input.setAttribute('type', 'radio')

  let launch_btn = document.createElement('button')
  launch_btn.setAttribute('id', 'launch_parser_btn')
  launch_btn.innerHTML = 'Запустить парсер'

  // param_form.appendChild(scr_input)
  // param_form.appendChild(scr_prc_input)
  param_form.appendChild(launch_btn)
}

// function launch_parser(chosen_parametres){
//  $.ajax
// }
