function make_screens_by_dom(domain) {
  // alert(domain)
  get_links_by_domain_to_screen(domain)
}

function get_links_by_domain_to_screen(domain) {
  $.ajax({
    url: `/get_links_by_domain_to_screen/${domain}`,
    type: 'GET',
  })
}
