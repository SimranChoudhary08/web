document.getElementById('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    fetchWord();
  }
});

function fetchWord() {
  const word = document.getElementById('input').value.trim();
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  if (word) {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Word not found');
        }
        return response.json();
      })
      .then((data) => {
        // Update the UI with word data
        document.getElementById('title').textContent = data[0].word;
        document.getElementById('meaning').textContent =
          data[0].meanings[0].definitions[0].definition;

        // Update audio (if available)
        if (data[0].phonetics[0] && data[0].phonetics[0].audio) {
          document.getElementById('audio').src = data[0].phonetics[0].audio;
          document.getElementById('audio').style.display = 'block';
        } else {
          document.getElementById('audio').style.display = 'none';
        }

        document.getElementById('meaning-container').classList.remove('d-none');
      })
      .catch((error) => {
        document.getElementById('title').textContent = 'Not Found';
        document.getElementById('meaning').textContent = 'Sorry, no results found.';
        document.getElementById('audio').style.display = 'none';
        document.getElementById('meaning-container').classList.remove('d-none');
      });
  }
}
