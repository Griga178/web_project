function parse_link(link_id) {
  launch_parser(link_id)
}

function launch_parser(link_id){
  $.ajax({
    url: `/parse_link/${link_id}`,
    type: 'GET',
    success: function(response){
      // alert(response)
    }
  })
}
