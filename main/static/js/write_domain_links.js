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
      pasted_links.innerHTML = ''
      write_links_list(domains_obj)
    }
  })
}

function write_links_list(links_array) {

  for (i in links_array) {
    new_li = document.createElement('li')
    // new_li.setAttribute('id', `${links_array[i][0]}`)
    new_a = document.createElement('a')
    // new_a.setAttribute('href', `${links_array[i][1]}`)
    new_a.setAttribute('href', `${links_array[i].link}`)
    new_a.setAttribute('target', '_blank')
    // new_a.innerHTML = `${links_array[i][0]} - - ${links_array[i][1]}`
    new_a.innerHTML = `${links_array[i].id} - - ${links_array[i].link}`
    new_li.appendChild(new_a)
    pasted_links.appendChild(new_li)

    // parse_btn = draw_parse_btn(links_array[i][0])
    parse_btn = draw_parse_btn(links_array[i].id)
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

// ДЛЯ БАЗЫ ССЫЛОК
function get_all_links_by_domains() {
  // получаем словарь домен:ссылки
  $.ajax({
    url: `/get_all_links_by_domains`,
    type: 'GET',
    success: function(response){
      domains_obj = JSON.parse(response)
      write_links_sorted_by_domain(domains_obj)

    }
  })

}
function write_links_sorted_by_domain(domains_obj) {
  let pasted_links = document.createElement('ul')
  pasted_links.setAttribute('id', 'pasted_links')
  document.body.appendChild(pasted_links)

  for (domain in domains_obj) {
    let dom_header = document.createElement('h3')
    dom_header.innerHTML = `${domain}`
    pasted_links.appendChild(dom_header)

    let screen_btn = document.createElement('p')
    screen_btn.innerHTML = 'Сделать скриншоты все ссылок домена'
    screen_btn.setAttribute('onclick', `make_screens_by_dom("${domain}")`)
    pasted_links.appendChild(screen_btn)

    write_links_list(domains_obj[domain])
  }
}
