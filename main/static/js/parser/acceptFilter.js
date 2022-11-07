btnAcceptFilter.onclick = () => {
  let chekedIdList = []
  // находим все input формы
  let inputObjArray = filterKknParts.getElementsByTagName("input")
  for (input_obj in inputObjArray) {
    // выбираем те которые выбраны
    if (inputObjArray[input_obj].checked){
      // добавляем данные эл-ов в список
      chekedIdList.push(inputObjArray[input_obj].dataset.partname)
    }
  }
  console.log(chekedIdList)
}
