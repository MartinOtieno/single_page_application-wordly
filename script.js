// Selects elements from the DOM
const form = document.getElementById("searchForm");
const wordInput = document.getElementById("wordInput");
const resultDiv = document.getElementById("result");
const errorMessage = document.getElementById("error");

form.addEventListener("submit", async (e) => { // adds an event listener for form submission
  e.preventDefault();

  const word = wordInput.value.trim();
  resultDiv.innerHTML = "";
  errorMessage.textContent = "";

  if (!word) { // checks if the input is empty
    errorMessage.textContent = "Please enter a word.";
    return;
  }

  // starts a try block to handle possible errors
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` //integrating api for dictionary
    );

    if (!response.ok) {
      throw new Error("Word not found"); // Displays an error if no word was entered
    }

    const data = await response.json(); // parses the response as JSON
    displayResult(data[0]);

  } catch (error) {
    errorMessage.textContent = "Word not found. Please try another.";
  }
});
// Function to display the result on the webpage
function displayResult(data) {
  const word = data.word;
  const phonetic = data.phonetics[0]?.text || "";
  const meaning = data.meanings[0];
  const definition = meaning.definitions[0].definition;
  const example = meaning.definitions[0].example || "No example available";
  const synonyms = meaning.definitions[0].synonyms || [];


  // Inserts dynamic HTML content into the page.
  resultDiv.innerHTML = ` 
    <div class="word">${word}</div>
    <div class="phonetic">${phonetic}</div>
    <div class="definition">
      <strong>Definition:</strong> ${definition}
    </div>
    <div>
      <strong>Example:</strong> ${example}
    </div>
    <div class="synonyms">
      <strong>Synonyms:</strong> ${synonyms.join(", ") || "None"}
    </div>
  `;
}
