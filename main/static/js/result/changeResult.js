function changeResult(currentResultID){
  let currentIndex = listResultId.indexOf(currentResultID)
  let previousResultId = false
  let nextResultId = false
  // настраиваем кнопки
  // первый результат
  if (currentIndex === 0) {
    nextResultId = listResultId[1]
  }
  // последний результат
  else if (currentIndex === (listResultId.length - 1)) {
    previousResultId = listResultId[currentIndex - 1]
  }
  else {
    previousResultId = listResultId[currentIndex - 1]
    nextResultId = listResultId[currentIndex + 1]
  }
  if (nextResultId) {
    buttonNext.onclick = () => {
      changeResult(nextResultId)
    }
  }
  if (previousResultId) {
    buttonPrevious.onclick = () => {
      changeResult(previousResultId)
    }
  }
  // запрашиваем данные
  getResult(currentResultID)
}
