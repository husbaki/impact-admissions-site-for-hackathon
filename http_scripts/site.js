
function sendMessage() {
    const input = document.getElementById('inputMessage');
    const message = input.value.trim();

    if (message === '') return;

    // Display user's message
    displayMessage(message, 'user');

    // Send message to backend
    fetch('http://localhost:8082/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        // Display assistant's response
        displayMessage(data.response, 'assistant');
    })
    .catch(error => console.error('Error:', error));

    // Clear input and focus
    input.value = '';
    input.focus();
}

function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user' : 'assistant');
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
