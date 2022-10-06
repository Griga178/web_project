function draw_current_result(result_object){
  let result_block = document.querySelector('.block_current_pr')
  // alert(result_block)
  let result_name = document.createElement('p')
  result_name.innerHTML = `${result_object.product_name}`
  // alert(result_object.product_name)
  result_block.appendChild(result_name)
}
