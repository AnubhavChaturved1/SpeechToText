const output = document.getElementById('output');
const startButton = document.getElementById('startButton');
let finalTranscript = '';
let recognitionTimeout; // Variable to store the recognition timeout

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;

startButton.addEventListener('click', () => {
    finalTranscript = '';
    output.textContent = '';
    recognition.start();
    startButton.textContent = 'Listening...';
    // Start a timer for recognition timeout
    recognitionTimeout = setTimeout(() => {
        recognition.stop();
        startButton.textContent = 'Start Listening';
        output.textContent = 'stopped';
    }, 50000); // Set timeout for 15 seconds
});

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');

    if (e.results[0].isFinal) {
        finalTranscript = transcript + ' ';
        output.textContent = finalTranscript;
        clearTimeout(recognitionTimeout); // Clear the timeout if there's input
        recognitionTimeout = setTimeout(() => {
            recognition.start();
            startButton.textContent = 'Listening...';
            output.textContent = 'Advance STT stopped due to inactivity';
        }, 15000); // Restart timeout after each final result
    } else {
        output.textContent = transcript;
    }
});

recognition.addEventListener('end', () => {
    startButton.textContent = 'Start Listening';
});
