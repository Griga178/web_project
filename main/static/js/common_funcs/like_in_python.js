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

function loadDomainSetting(thisObj) {
  let domainName = thisObj.getElementsByTagName("td")
  write_domain_setting(thisObj.dataset.primarykey, domainName[0].innerHTML)
  write_domain_links(thisObj.dataset.primarykey)
}

// function loadDomainLinks(thisObj) {
//   let domainName = thisObj.getElementsByTagName("td")
//
// }
