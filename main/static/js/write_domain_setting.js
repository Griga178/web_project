let settings_type = {
  'price':{'rus_tag':'Цена'},
  'name':{'rus_tag':'Название'}
}
function write_domain_setting(domain_id, domain_name) {

  $.ajax({
    url: `/write_domain_settings/${domain_id}`,
    type: 'GET',
    success: function(response){
      block_for_settings.innerHTML = ''
      domain_settings.innerHTML = ''

      let domain_name_span = document.createElement('span')
      domain_name_span.setAttribute('id', `${domain_id}`)
      domain_name_span.innerHTML = domain_name
      domain_settings.appendChild(domain_name_span)

      for (tags_type in settings_type) {

        let form_block = document.createElement('form');
        form_block.setAttribute("id", `${tags_type}`);

        let label_block = document.createElement('label');
        label_block.innerHTML = `${settings_type[tags_type]['rus_tag']}:`
        label_block.setAttribute('id', ``)

        form_block.appendChild(label_block)
        block_for_settings.appendChild(form_block)

        let tag_name_input = document.createElement('input')
        tag_name_input.setAttribute("name", 'tag_name');
        tag_name_input.setAttribute("type", "text");
        // tag_name_input.setAttribute("value", `${obj_set?obj_set[type]:''}`);
        let attribute_input = document.createElement('input')
        attribute_input.setAttribute("name", 'attribute');
        attribute_input.setAttribute("type", "text");
        let attr_value_input = document.createElement('input')
        attr_value_input.setAttribute("name", 'attr_value');
        attr_value_input.setAttribute("type", "text");

        let save_btn = document.createElement('span')
        save_btn.setAttribute('onclick', `save_setting("${tags_type}")`)
        save_btn.innerHTML = "Сохранить"

        let final_row = document.createElement("div")


        final_row.appendChild(tag_name_input)
        final_row.appendChild(attribute_input)
        final_row.appendChild(attr_value_input)

        final_row.appendChild(save_btn)

        form_block.appendChild(final_row)
      }

    }
  })
}

function write_input_setting(){
  // let form_block = document.createElement('form');
  // form_block.setAttribute("id", `${tag_type}`);

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
}

function post_to_server(str_data) {
  $.ajax({
    url: `/save_domain_settings`,
    contentType: 'application/json',
    type: 'POST',
    dataType : 'json',
    data: str_data,
    success: function(response) {
      alert(response)
      // draw_input_tag(response, form_block)
    }
  })
}
