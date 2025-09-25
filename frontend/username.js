window.addEventListener('load', function() {

const userName = document.getElementById("user-form");

userName.addEventListener("submit", (event) => {
    // event.preventDefault();
    const name = document.getElementById("nameInput").value.toUpperCase();

    if (userName.style.display != "none"){
        userName.style.display = "none";
    };

}); 



// js for the Cat API
const button = document.getElementById("catBtn");
const catImg = document.getElementById("catImg");

function fetchCat() {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json()) // convert response to JSON
    .then(data => {
      catImg.src = data[0].url; // set the image source to the cat URL
    })
    .catch(error => console.error("Error fetching cat image:", error));
}
button.addEventListener("click", fetchCat);

window.addEventListener("DOMContentLoaded", fetchCat);
});


//quotes api

getText("https://motivational-spark-api.vercel.app/api/quotes/random");

async function getText(file) {
  let response = await fetch(file);
  let data = await response.json();
  document.getElementById("quote").innerHTML = `"${data.quote}" — ${data.author} `;
}