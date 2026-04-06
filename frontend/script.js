const form = document.getElementById('messageForm');
const result = document.getElementById('result');
const apiUrl = window.location.protocol === 'file:' ? 'http://localhost:5000/submit' : '/submit';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  result.textContent = 'Submitting...';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, message })
    });

    const data = await response.json();
    result.textContent = data.message || 'Submitted successfully!';
    form.reset();
  } catch (error) {
    result.textContent = 'Error: Could not connect to backend API.';
  }
});
