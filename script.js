
const form = document.getElementById("feedback-form");
const formResponse = document.getElementById("displayName");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("nameInput").value.toUpperCase();
  formResponse.textContent = `Hello ${name}, Let's practice some Spanish`;
  // form.reset();

  if (form.style.display === "none"){
    form.style.direction = "block";
  } else {
    form.style.display = "none";
  }
}); 

