window.addEventListener("keydown", function(eventTarget) {
  if (eventTarget.key === "ArrowLeft") {
    eventTarget.preventDefault();
    buttonPrevious.click();
  }
});

window.addEventListener("keydown", function(eventTarget) {
  if (eventTarget.key === "ArrowRight") {
    eventTarget.preventDefault();
    buttonNext.click();
  }
});

window.addEventListener("keydown", function(eventTarget) {
  if (eventTarget.key === "Enter") {
    // eventTarget.preventDefault();
    // buttonNext.click();
  }
});
// SPACE
window.addEventListener("keydown", function(eventTarget) {
  if (eventTarget.keyCode === 32) {
    eventTarget.preventDefault();
    spanPriceValue.click();
  }
});
// TAB
window.addEventListener("keydown", function(eventTarget) {
  if (eventTarget.keyCode === 9) {
    eventTarget.preventDefault();
    // buttonNext.click();
  }
});

window.addEventListener("keydown", function(eventTarget) {
  if (eventTarget.key === "a") {
    // eventTarget.preventDefault();
    buttonPrevious.click();
  }
  else if (eventTarget.key === "d") {
    // eventTarget.preventDefault();
    buttonNext.click();
  }


});
