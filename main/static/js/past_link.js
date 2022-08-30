function past_link(){
  post_to_server()
}

function post_to_server(){
  $.ajax({
    url: "/add_new_link",
    data: $('form').serialize(),
    type: 'POST',

    success: function(response) {
      alert(response)
    }
  })
}
