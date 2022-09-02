function write_domains(){
  $.ajax({
    url: '/write_domain_list',
    type: 'GET',
    success: function(response){
      domain_table.innerHTML = ''
      array_obj = jQuery.parseJSON(response);
      draw_domain_table(array_obj)
    }
  })
}

function draw_domain_table(domains_obj){
  table_header = document.createElement('th')
  table_header.innerHTML = "<td>№</td><td>Домен</td>"

  domain_table.appendChild(table_header)

  for (domain in domains_obj){
    domain_row = document.createElement('tr')
    domain_row.setAttribute("onclick", `write_domain_setting(${domains_obj[domain][0]}, "${domains_obj[domain][1]}");write_domain_links(${domains_obj[domain][0]})`)
    domain_row.setAttribute("style", 'cursor:pointer')
    domain_row.innerHTML = `
      <td>${domains_obj[domain][0]}</td>
      <td>${domains_obj[domain][1]}</td>`
    domain_table.appendChild(domain_row)
  }

}
