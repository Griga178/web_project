function parse_link(link_id) {
  launch_parser(link_id)
}

function launch_parser(spanBtnObject){
  let idlink = spanBtnObject.dataset.idlink
  $.ajax({
    url: `/parse_link/${idlink}`,
    type: 'GET',
    before: spanBtnObject.innerHTML = 'Парсим...',
    success: function(response){
      // alert(response)
      let jsResponse = readJsonFromSrv(response)
      spanBtnObject.innerHTML = `   ${jsResponse.price}, ${jsResponse.name} ` //.splice(0,20)
      spanBtnObject.onclick = ""

    }
  })
}
