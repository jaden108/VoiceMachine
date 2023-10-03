// ...

// Function to toggle the voice modal on/off
function toggleVoiceModal() {
    if (voiceModal.style.display === 'none' || voiceModal.style.display === '') {
        voiceModal.style.display = 'block';
        voiceMachineContainer.style.display = 'none';
    } else {
        voiceModal.style.display = 'none';
        voiceMachineContainer.style.display = 'block';
    }
}

// Toggle voice modal when the voices button is clicked or touched
voicesButton.addEventListener('click', toggleVoiceModal);
voicesButton.addEventListener('touchend', toggleVoiceModal);

// Toggle voice modal when the close button on the modal is clicked or touched
closeButton.addEventListener('click', toggleVoiceModal);
closeButton.addEventListener('touchend', toggleVoiceModal);

// Function to make the browser speak the text using the selected voice
function speakText() {
    // Get the name of the selected voice from the option
    const selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    // Get all available voices
    const voices = speechSynthesis.getVoices();
    // Find the voice that matches the selected name
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);

    // Set the selected voice for the utterance
    utterance.voice = selectedVoice;
    // Set the text to be spoken to the value of the text input
    utterance.text = textInput.value;

    // Make the browser speak the text using the selected voice
    speechSynthesis.speak(utterance);
}

// Add event listeners for both click and touchend events on the speak button
speakButton.addEventListener('click', speakText);
speakButton.addEventListener('touchend', speakText);

// ...
