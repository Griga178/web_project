function getResult(resultId) {
  $.ajax({
    url: `/get_result_by_id/${resultId}`,
    type: 'GET',
    contentType: "image/jpg",
    success: function(resultDataJSON) {
      resultData = JSON.parse(resultDataJSON)
      
      fillResult(resultData)
      }
  })
}
