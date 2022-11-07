btnAcceptFilter.onclick = () => {
  let idList = []
  let inputObjArray = document.forms.part_form.getElementsByTagName("input")
  console.log(inputObjArray);
  for (input_obj in inputObjArray) {
    idList.push(input_obj)
  }
  console.log(idList)
}
