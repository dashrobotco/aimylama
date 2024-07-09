const statusDiv = document.getElementById('status');
const testButton = document.getElementById('testButton');

function updateStatus(message) {
  statusDiv.textContent = message;
  console.log(message);
}

testButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/hello');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    updateStatus(`Server response: ${data.message}`);
  } catch (error) {
    updateStatus(`Error: ${error.message}`);
    console.error('Fetch error:', error);
  }
});