const categories = {
  animals: {"🐵": "mono", "🐶": "perro", "🦊": "zorro", "🐱": "gato", "🦁": "león", "🐯": "tigre", "🐴": "caballo", "🐮": "vaca", "🐷": "cerdo"},
  foods: {"🍏": "manzana verde", "🍎": "manzana", "🍐": "pera", "🍊": "naranja", "🍋": "limón", "🍌": "plátano", "🍉": "sandía", "🍇": "uvas", "🍓": "fresa"},
  numbers: {"1️⃣": "uno", "2️⃣": "dos", "3️⃣": "tres", "4️⃣": "cuatro", "5️⃣": "cinco", "6️⃣": "seis", "7️⃣": "siete", "8️⃣": "ocho", "9️⃣": "nueve"},
  moods: {"😀": "feliz", "😔": "pensativo", "😭": "triste", "😠": "enojado", "😜": "juguetón", "❤️": "amor", "😴": "dormido", "🤔": "pensativo", "🥱": "cansado"}
};

const form = document.getElementById("categoryForm");
const select = document.getElementById("categorySelect");
const card = document.getElementById("card");

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
    card.textContent = "🎉 Finished all cards!";
    card.classList.remove("revealed");
    return;
  }
  showEmoji();
  scheduleReveal();
}


function nextFlash() {
  if (showingTranslation) {
    currentIndex = (currentIndex + 1) % emojiEntries.length;
    showEmoji();
  } else {
    showTranslation();
  }
}

function scheduleReveal() {
  revealTimeout = setTimeout(() => {
    showTranslation();
    scheduleNextCard();
  }, 4000);
}

function scheduleNextCard() {
  nextCardTimeout = setTimeout(() => {
    showNextCard();
  }, 3000);
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

