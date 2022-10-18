// ДАННЫЕ ОТ СЕРВЕРА
let list_jpg_id = ['3', '4', '5', '6', '8']
let list_name_value = ['Пневматический очиститель', 'Баллон со сжатым воздухом', 'Пневматический очиститель', 'Пневматический очиститель', 'Коврик для мыши']
let list_price_value = [269, 334.53, 304, 181, 209]

button_next.onclick = () => {
  let cur_i = GetIndexByScreenID(PScreenID.textContent)
  let data_arr = GetDataByIndex(cur_i + 1)
  FillResultBlock(data_arr)
}

button_previous.onclick = () => {
  let cur_i = GetIndexByScreenID(PScreenID.textContent)
  let data_arr = GetDataByIndex(cur_i - 1)
  FillResultBlock(data_arr)
}

window.addEventListener("keydown", function(e) {
  if (e.key == "ArrowLeft") {
    button_previous.click();
  }
});

window.addEventListener("keydown", function(e) {
  if (e.key == "ArrowRight") {
    button_next.click();
  }
});

function FillResultBlock ([jpg_id, name_value, price_value]) {
  PScreenID.innerHTML = jpg_id
  CurrentImageContainer.setAttribute('src', 'images/' + jpg_id + '.jpg')
  SpanTextName.innerHTML = name_value
  SpanPriceValue.innerHTML = price_value
}
// ИНДЕС В СПИСКЕ ПО НАЗВАНИЮ СКРИНА
function GetIndexByScreenID(screen_id) {
  return list_jpg_id.indexOf(screen_id)
}
// ИНФА ИЗ ОТВЕТА СЕРВЕРА ПО ИНДЕКСУ
function GetDataByIndex(scr_index){
  return [list_jpg_id[scr_index], list_name_value[scr_index], list_price_value[scr_index]]
}
