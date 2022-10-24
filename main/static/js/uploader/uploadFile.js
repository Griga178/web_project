

function uploadFile(){

  // let formData = new FormData(uploadFileForm[0]);
  // let formData = new FormData($('#upload-file')[0]);
  // console.log(formData)
  var formData = new FormData();
  formData.append('file', $("#uploadFileForm")[0].files[0]);

  $.ajax({
      type: 'POST',
      url: '/upload_file',
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      success: function(response) {
          console.log('Success!', response);
      },
  });
}
