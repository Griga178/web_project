function inputDomainObjects(jsonDomainList) {
  let filterDataObj = JSON.parse(jsonDomainList)

  console.log(filterDataObj)
  return filterDataObj
}
let headers_rules = [
  {    "name": "Домен",
      "sorted": true,    "search": true  },
  {    "name": "Кол-во ссылок (от)",
      "sorted": true,    "search": true  },
  {    "name": "Настройки (есть/нет)",
      "sorted": true,    "search": true  },
]
function drawDomainFilterTable(filterDataObj) {
  createHeader()
  createHeaderV2(headers_rules)
}



function createHeader(){

  let thead_d = document.createElement('thead')

  let name_row = document.createElement('tr')
  let th_domain = document.createElement('th')
  th_domain.innerHTML = 'Домены'
  th_domain.setAttribute('class', 'btn')
  th_domain.setAttribute('onclick', 'sortTable(0)')
  th_domain.setAttribute('style', 'user-select: none')
  let th_amount = document.createElement('th')
  th_amount.innerHTML = 'Кол-во ссылок (от)'
  th_amount.setAttribute('class', 'btn')
  th_amount.setAttribute('onclick', 'sortTable(1)')
  th_amount.setAttribute('style', 'user-select: none')
  let th_settings = document.createElement('th')
  th_settings.innerHTML = 'Настройки (есть/нет)'
  th_settings.setAttribute('class', 'btn')
  th_settings.setAttribute('onclick', 'sortTable(2)')
  th_settings.setAttribute('style', 'user-select: none')
  name_row.appendChild(th_domain)
  name_row.appendChild(th_amount)
  name_row.appendChild(th_settings)

  let input_row = document.createElement('tr')
  let inp_th_domain = document.createElement('th')
  let domain_input = document.createElement('input')
  inp_th_domain.appendChild(domain_input)
  let inp_th_amount = document.createElement('th')
  let amount_input = document.createElement('input')
  inp_th_amount.appendChild(amount_input)
  let inp_th_settings = document.createElement('th')
  let settings_input = document.createElement('input')
  inp_th_settings.appendChild(settings_input)
  input_row.appendChild(inp_th_domain)
  input_row.appendChild(inp_th_amount)
  input_row.appendChild(inp_th_settings)

  thead_d.appendChild(name_row)
  thead_d.appendChild(input_row)

  domainFilterTable.appendChild(thead_d)
}

function createHeaderV2(information){
  let thead_d = document.createElement('thead')
  let name_row = document.createElement('tr')
  let input_row = document.createElement('tr')
  let clmIndexNum = 0
  for (name in information) {
    let th_name = document.createElement('th')
    // name_row
    let th_input = document.createElement('th')
    th_name.innerHTML = information[name].name


  }
}
