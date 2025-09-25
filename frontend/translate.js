// import dotenv from "dotenv";

// dotenv.config();

// const apiKey = process.env.API_KEY;

async function translateText(text, target) {
  const url = `https://translation.googleapis.com/language/translate/v2`;

  const body = {
    q: text,
    target: target,
    source: 'en',
    format: 'text',
    // key: apiKey
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  // Translate API returns translations in data.data.translations
  const translations = data.data.translation;

  translations.forEach((translation, index) => {
    console.log(`${text} => (${target}) ${translation.translatedText}`);
  });
}

translateText('Hello, world!', 'es').catch(console.error);
