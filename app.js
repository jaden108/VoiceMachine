// Check if speechSynthesis is supported by the browser
if (!('speechSynthesis' in window)) {
    alert("This app doesn't have access to robot voices 🥲");
} else {
    // Get references to HTML elements
    const textInput = document.getElementById('text-input');
    const speakButton = document.getElementById('speak-button');
    const voiceList = document.getElementById('voice-list');
    const voicesButton = document.getElementById('voices-button');
    const voiceMachineContainer = document.getElementById('voice-machine-container');
    const voiceModal = document.getElementById('voice-modal');
    const closeButton = document.getElementById('close-modal');

    // Hide the voice modal by default
    voiceModal.style.display = 'none';

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

    // Toggle voice modal when the voices button is clicked
    voicesButton.addEventListener('click', toggleVoiceModal);
    // Toggle voice modal when the close button on the modal is clicked
    closeButton.addEventListener('click', toggleVoiceModal);

    // Function to populate the voice list with available voices
    function populateVoiceList() {
        // Get voices from the browser's speechSynthesis API
        const voices = speechSynthesis.getVoices();
        // Filter for English voices (en-US)
        const enUSVoices = voices.filter((voice) => voice.lang === 'en-US');

        // Remove existing options from the voice list
        voiceList.innerHTML = '';

        // Loop through available English voices and add them as options
        enUSVoices.forEach((voice, index) => {
            // Create a new option element
            const option = document.createElement('option');
            // Set the text and language for the option
            option.textContent = `${voice.name} (${voice.lang})`;
            // Save the voice's name as extra info
            option.setAttribute('data-name', voice.name);
            // Add the option to the voice list
            voiceList.appendChild(option);

            // Choose Zarvox as the default voice (if available)
            if (voice.name === 'Zarvox') {
                voiceList.selectedIndex = index;
            }
        });
    }

    // Run the populateVoiceList function initially
    populateVoiceList();

    // Run the populateVoiceList function when voices have changed
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    // Create an instance of SpeechSynthesisUtterance for speech output
    const utterance = new SpeechSynthesisUtterance();

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
}
