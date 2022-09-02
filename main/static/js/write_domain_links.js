function write_domain_links(domain_id) {
  // alert(`Добавляем ссылки домена № ${domain_id}`)
  get_domain_links(domain_id)
}

function get_domain_links(domain_id) {
  $.ajax({
    url: `/get_domain_links/${domain_id}`,
    type: 'GET',
    success: function(response){
      domains_obj = JSON.parse(response)
      write_links_list(domains_obj)
    }
  })
}

function write_links_list(links_array) {
  pasted_links.innerHTML = ''
  for (i in links_array) {
    new_li = document.createElement('li')
    // new_li.setAttribute('id', `${links_array[i][0]}`)
    new_a = document.createElement('a')
    new_a.setAttribute('href', `${links_array[i][1]}`)
    new_a.setAttribute('target', '_blank')
    new_a.innerHTML = `${links_array[i][0]} - - ${links_array[i][1]}`
    new_li.appendChild(new_a)
    pasted_links.appendChild(new_li)

    parse_btn = draw_parse_btn(links_array[i][0])
    new_li.appendChild(parse_btn)
  }
}

function draw_parse_btn(link_id) {
  let span_btn = document.createElement('span')
  span_btn.setAttribute('onclick', `parse_link(${link_id}); append_hide_attr(this)`)
  span_btn.setAttribute('style', 'cursor:pointer')
  span_btn.innerHTML = 'Отпарсить'
  return span_btn
}

function append_hide_attr(elem) {
  elem.setAttribute('hidden', '')
}
