// ├── parsing_results {}
// │   ├── 'link_id': int(*) \ false
// │   ├── 'avaliable': str(*) \ false
// │   ├── 'price': float(*) \ false
// │   ├── 'name': str(*) \ false
// │   ├── 'current_date': str("%d/%m/%Y")
// │   ├── 'user_changed': true \ false

function get_json_object(js_obx_from_srv){
  result_object = JSON.parse(js_obx_from_srv)
  console.log(result_object)
  draw_list_of_results(result_object)
}
