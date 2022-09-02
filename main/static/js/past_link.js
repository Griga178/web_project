function past_link(elem){
  post_link_to_server()
  input_vs_link = elem.previousElementSibling
  input_vs_link.value = ''
}

function post_link_to_server(){
  $.ajax({
    url: "/add_new_link",
    data: $('form').serialize(),
    type: 'POST',

    success: function(response) {
      // alert(response)
      links_obj = JSON.parse(response)
      add_link_to_list(links_obj)
    }
  })
}

function add_link_to_list(links_obj){
  pasted_links.innerHTML = ''
  for (domain in links_obj) {
    delete links_obj[domain]["domain_id"]
    for (link_id in links_obj[domain]) {
      new_li = document.createElement('li')
      new_a = document.createElement('a')
      new_a.setAttribute('href', `${links_obj[domain][link_id]}`)
      new_a.innerHTML = `${link_id} - - ${links_obj[domain][link_id]}`
      new_li.appendChild(new_a)
      pasted_links.appendChild(new_li)
    }
  }
}
