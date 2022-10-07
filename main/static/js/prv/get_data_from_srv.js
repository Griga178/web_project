// ├── js_obx_from_srv {}
// │   ├── result_id {}
// │   │   ├── 'domain_name': domain_name
// │   │   ├── 'link': link
// │   │   ├── 'parsing_date': str("%d/%m/%Y")
// │   │   ├── 'price': float(*)
// │   │   ├── 'product_name': str(*) \ false
// │   │   ├── 'product_not_avaliable': true \ false
// │   │   ├── 'user_changed': true \ false \ null

function get_json_object(js_obx_from_srv){
  result_object = JSON.parse(js_obx_from_srv)
  // console.log(result_object)
  draw_filter_bar(result_object)
}

function get_img(img_id) {
  $.ajax({
    url: `/get_image/${img_id}`,
    type: 'GET',
    contentType: "image/jpg",
    success: function(result) {

          current_img.src = 'data:;base64,' + result['image'];
        }
  })
}
