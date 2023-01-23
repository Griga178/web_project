function len(jsArray){
  return jsArray.length
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function readJsonFromSrv(jsonObject) {
  return JSON.parse(jsonObject)
}
