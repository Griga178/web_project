//
// ├── result_id {}
// │   ├── 'domain_name': domain_name
// │   ├── 'link': link
// │   ├── 'parsing_date': str("%d/%m/%Y")
// │   ├── 'price': float(*)
// │   ├── 'result_id': str(id)
// │   ├── 'product_name': str(*) \ false
// │   ├── 'product_not_avaliable': true \ false
// │   ├── 'user_changed': true \ false \ null

function draw_current_result(result_object){
  // let results_block = document.querySelector('.current_result_container')
  // alert(result_block)
  // let result_name = document.createElement('h4')
  product_name_head.innerHTML = `${result_object.product_name}`
  // alert(result_object.product_name)
  get_img(`${result_object.result_id}`)
  // current_img.setAttribute('src', `${"2.jpg"}`)
  // results_block.prepend(result_name)
}
