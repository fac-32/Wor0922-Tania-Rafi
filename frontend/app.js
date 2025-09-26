window.addEventListener('load', function() {

  const form = document.getElementById("categoryForm");
  const select = document.getElementById("categorySelect");
  const card = document.getElementById("card");

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
    }, 3000);
  }

  function scheduleNextCard() {
    nextCardTimeout = setTimeout(() => {
      showNextCard();
    }, 10000);
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

  const exitButton = this.document.getElementById("exit-button");

  exitButton.addEventListener("click", () => {
    window.location.href = "/feedback";
  })

});

// ---- RHYMES INTEGRATION ---- with DataMuse // This is a strictly read-only service and an API token is NOT required. The service supports both HTTP and HTTPS requests.

const card = document.getElementById("card");
const rhymeEl = document.getElementById("rhyme");

const observer = new MutationObserver(() => { //watches for changes in the DOM
  
  const word = card.textContent; //get the word on the card
  rhymeEl.textContent = "Loading rhymes...";

  // Fetch rhymes from Datamuse API
  fetch(`https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(word)}&v=es`) //fetch(url) → makes an HTTP request and returns a Promise.
  //  fetch(`https://api.datamuse.com/words?sl=${encodeURIComponent(word)}&v=es`) // words that sound similar

    .then(res => res.json()) // the promise retun a response that we parse to json and then into JS

    .then(data => { //data → the JavaScript array/object returned by .json().
      if (data.length > 0) {
        rhymeEl.textContent = "Rhymes: " + data.slice(0, 5).map(w => w.word).join(", ");
      } else {
        rhymeEl.textContent = "No rhymes found.";
      }
    })
    .catch(err => {
      console.error("Rhyme API error:", err);
      rhymeEl.textContent = "Error loading rhymes.";
    });
});

observer.observe(card, { childList: true, characterData: true, subtree: true });

