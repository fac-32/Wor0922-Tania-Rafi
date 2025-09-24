window.addEventListener('load', function() {

const userFeedback = document.getElementById("feedback");
const thankYouSection = document.getElementById("thank-you");
const formFeedback = document.getElementById("form-feedback");

formFeedback.addEventListener("submit", (event) => {
  event.preventDefault();
  userFeedback.style.display = "none";
  thankYouSection.style.display = "block";

});

const exitButton = this.document.getElementById("exit-button");

exitButton.addEventListener("click", () => {
  window.location.href = "/feedback";
})

});
