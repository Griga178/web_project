let settings_type = {
  'price':{'rus_tag':'Цена'},
  'name':{'rus_tag':'Название'},
  'avaliable':{'rus_tag':'Товара нет наличии'}
}

function combine_settings(settings_from_db){
  settings_from_db = JSON.parse(settings_from_db)
  let combine_lists = []
  // проверяем какие настройки есть в бд
  let check_dict = {'price':[], 'name':[], 'avaliable':[]}
  for (set_name in check_dict) {
    for (setting in settings_from_db) {
      if (settings_from_db[setting][0] === set_name) {
        check_dict[set_name].push(setting)
      }
    }
  }

  // заполняем итоговый список
  for (tag_name in check_dict) {
    if (check_dict[tag_name].length === 0) {
      combine_lists.push([tag_name, false, false])
    }
    for (setting_id in check_dict[tag_name]){
      let id_setting = check_dict[tag_name][setting_id]
      let content_setting = settings_from_db[id_setting][1]
      combine_lists.push([tag_name, id_setting ,content_setting])
    }
  }

  return combine_lists
}
function write_domain_setting(domain_id, domain_name) {

  $.ajax({
    url: `/write_domain_settings/${domain_id}`,
    type: 'GET',
    success: function(response){

      block_for_settings.innerHTML = ''
      domain_settings.innerHTML = ''

      let combine_lists = combine_settings(response)
      // alert(JSON.stringify(combine_lists))

      let domain_name_span = document.createElement('span')
      domain_name_span.setAttribute('id', `${domain_id}`)
      domain_name_span.innerHTML = domain_name
      domain_settings.appendChild(domain_name_span)

      for (settings in combine_lists) {
        write_input_setting(combine_lists[settings])
      }
    }
  })
}

function write_input_setting(setting_list){
  // alert(setting_list)
  let input_names = ['tag_name', 'attribute', 'attr_value']
  let setting_type = setting_list[0]
  let setting_id = setting_list[1]?setting_list[1]:''
  let setting_content = setting_list[2]?setting_list[2].split(';'):''

  let form_block = document.createElement('form');
  form_block.setAttribute("id", `${setting_type}`);

  let label_block = document.createElement('label');
  label_block.innerHTML = `${settings_type[setting_type]['rus_tag']}:`
  label_block.setAttribute('id', `${setting_id}`)
  form_block.appendChild(label_block)

  let inputs_row = document.createElement("div")

  for (i in input_names) {
    let input_tag = document.createElement('input')
    input_tag.setAttribute("name", `${input_names[i]}`);
    input_tag.setAttribute("type", "text");
    input_tag.setAttribute('onchange', 'show_element(this)')
    input_tag.setAttribute("value", `${setting_content?setting_content[i]:''}`);

    inputs_row.appendChild(input_tag)
  }
  let save_btn = document.createElement('span')
  save_btn.setAttribute('onclick', `save_setting("${setting_type}")`)
  save_btn.setAttribute('hidden', '')
  save_btn.setAttribute('name','save_btn')
  save_btn.innerHTML = "Сохранить"

  let delete_btn = document.createElement("span")


  if (setting_id){delete_btn.setAttribute("onclick", `delete_setting(${setting_id});clear_inputs(this)`);}
  else {delete_btn.setAttribute('hidden', '')}

  delete_btn.innerHTML = "Удалить"

  inputs_row.appendChild(delete_btn)
  inputs_row.appendChild(save_btn)
  form_block.appendChild(inputs_row)
  block_for_settings.appendChild(form_block)
}

function save_setting(tags_type){

  let domain_id = domain_settings.firstChild.id
  let saving_form = document.getElementById(tags_type)
  let setting_id = saving_form.firstChild.id

  let in_tag = saving_form.elements.tag_name.value;
  let in_attr = saving_form.elements.attribute.value;
  let in_value = saving_form.elements.attr_value.value;

  let dict_out = {
    "id_domain": domain_id,
    "id_setting": setting_id?setting_id:false,
    "name": tags_type,
    "content": `${in_tag};${in_attr};${in_value}`
  }

  let json_string_out = JSON.stringify(dict_out)
  // alert(`Сохранили:\n${json_string_out}`)
  post_to_server(json_string_out)
  // при сохранении прячем кнопку "СОХРАНИТЬ"
  let save_btn = saving_form.childNodes[1].childNodes[4]
  save_btn.setAttribute('hidden', '')


}


function post_to_server(str_data) {
  $.ajax({
    url: `/save_domain_settings`,
    contentType: 'application/json',
    type: 'POST',
    dataType : 'json',
    data: str_data,
    success: function(response) {
      // alert(response['save'])
      // исчезает кнопка сохранить
      // инпуты превращаются в строку
    }
  })
}

function delete_setting(setting_id){
  let send_data = JSON.stringify(setting_id)
  $.ajax({
      url: `/delete_domain_setting`,
      contentType: 'application/json',
      type: 'POST',
      dataType : 'json',
      data: send_data,
      success: function(response) {
      }
    })
}

function clear_inputs(Element){
  let parent_form = Element.parentNode.parentNode
  parent_form.elements.tag_name.value = ''
  parent_form.elements.attribute.value = ''
  parent_form.elements.attr_value.value = ''
  Element.setAttribute('hidden','')
  save_btn = Element.nextElementSibling
  save_btn.setAttribute('hidden','')
}

function show_element(elem) {
  let save_btn = (elem.parentNode).childNodes[4]
  let delete_btn = (elem.parentNode).childNodes[3]
  save_btn.removeAttribute('hidden')
  delete_btn.removeAttribute('hidden')
  delete_btn.setAttribute('onclick', 'clear_inputs(this)')
}
