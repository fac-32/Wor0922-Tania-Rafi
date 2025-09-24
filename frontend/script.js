window.addEventListener('load', function() {

const userName = document.getElementById("user-form");
const formResponse = document.getElementById("displayName");
const userChoice = document.getElementById("user-choice");
const form = document.getElementById("categoryForm");
const select = document.getElementById("categorySelect");
const cardSec = document.getElementById("flashcard");
const card = document.getElementById("card");


userName.addEventListener("submit", (event) => {
    // event.preventDefault();
    const name = document.getElementById("nameInput").value.toUpperCase();

    formResponse.textContent = `Hello ${name}, Let's practice some Spanish`;

    if (userName.style.display != "none"){
        userName.style.display = "none";
    };

    // userChoice.style.display = 'flex';
    // cardSec.style.display = 'flex';

}); 


const categories = {
  animals: {"🐵": "mono", "🐶": "perro", "🦊": "zorro", "🐱": "gato", "🦁": "león", "🐯": "tigre", "🐴": "caballo", "🐮": "vaca", "🐷": "cerdo"},
  foods: {"🍏": "manzana verde", "🍎": "manzana", "🍐": "pera", "🍊": "naranja", "🍋": "limón", "🍌": "plátano", "🍉": "sandía", "🍇": "uvas", "🍓": "fresa"},
  numbers: {"1️⃣": "uno", "2️⃣": "dos", "3️⃣": "tres", "4️⃣": "cuatro", "5️⃣": "cinco", "6️⃣": "seis", "7️⃣": "siete", "8️⃣": "ocho", "9️⃣": "nueve"},
  moods: {"😀": "feliz", "😔": "pensativo", "😭": "triste", "😠": "enojado", "😜": "juguetón", "❤️": "amor", "😴": "dormido", "🤔": "pensativo", "🥱": "cansado"}
};

let emojiEntries = [];
let currentIndex = 0;
let showingTranslation = false;
let revealTimeout = null;
let nextCardTimeout = null;

function showEmoji() {
  card.textContent = emojiEntries[currentIndex][0];
  card.classList.remove("revealed");
  showingTranslation = false;
}

function showTranslation() {
  card.textContent = emojiEntries[currentIndex][1];
  card.classList.add("revealed");
  showingTranslation = true;
}

function showNextCard() {
  currentIndex++;
  if (currentIndex >= emojiEntries.length) {
    card.classList.remove("revealed");
    card.textContent = "";
    let show = true;
    let blinkInterval = setInterval(() => {
      card.textContent = show ? "🎉 Finished all cards!": "";
      show = !show;
    }, 1000);
    setTimeout(() => clearInterval(blinkInterval), 5000);
    return;
  } 
  showEmoji();
  scheduleReveal();
}

function scheduleReveal() {
  revealTimeout = setTimeout(() => {
    showTranslation();
    scheduleNextCard();
  }, 2000);
}

function scheduleNextCard() {
  nextCardTimeout = setTimeout(() => {
    showNextCard();
  }, 1000);
}

function clearTimers() {
  clearTimeout(revealTimeout);
  clearTimeout(nextCardTimeout);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = select.value;
  if (!category || !categories[category]) {
    alert("Please select a valid category.");
    return;
  }
  clearTimers();
  emojiEntries = Object.entries(categories[category]);
  currentIndex = 0;
  showEmoji();
  scheduleReveal();
});


card.addEventListener("click", () => {
  if (emojiEntries.length === 0 || showingTranslation) return;
  clearTimers();
  showTranslation();
  scheduleNextCard();
});

});
