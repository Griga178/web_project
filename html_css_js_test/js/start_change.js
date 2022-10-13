let result_list = [1, 2, 3]

button_next.onclick = () => {
  alert(screen_shot.textContent)
}

button_previous.onclick = () => {
  alert(screen_shot.textContent)
}

window.addEventListener("keydown", function(e) {
  if (e.key == "ArrowLeft") {
    button_next.click();
  }
});

window.addEventListener("keydown", function(e) {
  if (e.key == "ArrowRight") {
    button_previous.click();
  }
});