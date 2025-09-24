window.addEventListener('load', function() {

const userName = document.getElementById("user-form");

userName.addEventListener("submit", (event) => {
    // event.preventDefault();
    const name = document.getElementById("nameInput").value.toUpperCase();

    if (userName.style.display != "none"){
        userName.style.display = "none";
    };

}); 

});