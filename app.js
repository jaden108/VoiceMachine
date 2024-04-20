/*

outcome
=======
-speak the text wrote 


milestones
============
 
- make the browser speak what i wrote with the selected voice


*/
// - check if speech exists in browser
if (!('speechSynthesis' in window)) {
  alert("This app doesn't have access to robot voices 🥲");
} else {
  // - get access to the text input
  const textInput = document.getElementById('text-input');
  // - get access to the speak button
  const speakButton = document.getElementById('speak-button');
  // - get access to the voice list
  const voiceList = document.getElementById('voice-list');
  // - get access to the voice button
  const voicesButton = document.getElementById('voices-button');
  // - get access to the voice machine container
  const voiceMachineContainer = document.getElementById(
    'voice-machine-container'
  );
  // - get access to the modal
  const voiceModal = document.getElementById('voice-modal');
  // - get access to the close button on modal
  const closeButton = document.getElementById('close-modal');

  // - hide modal
  voiceModal.style.display = 'none';

  // - toggle modal on/off
  function toggleVoiceModal() {
    if (
      voiceModal.style.display === 'none' ||
      voiceModal.style.display === ''
    ) {
      voiceModal.style.display = 'block';
      voiceMachineContainer.style.display = 'none';
    } else {
      voiceModal.style.display = 'none';
      voiceMachineContainer.style.display = 'block';
    }
  }

  // toggle voice modal on and off
  voicesButton.addEventListener('click', toggleVoiceModal);
  // toggle voice modal when I click X
  closeButton.addEventListener('click', toggleVoiceModal);

  // - add voices to the voice list
  function populateVoiceList() {
    // - get voices from browser
    const voices = speechSynthesis.getVoices();
    // - get all the english voices
    const enUSVoices = voices.filter((voice) => voice.lang === 'en-US');
    // - add voices to select
    enUSVoices.forEach((voice, index) => {
      // create a new option
      const option = document.createElement('option');
      // set the text and language for the option
      option.textContent = `${voice.name} (${voice.lang})`;
      // save the voice's name as extra info
      option.setAttribute('data-name', voice.name);
      // add the option to voice list
      voiceList.appendChild(option);
      // choose zorvox as the default
      if (voice.name === 'Zarvox') {
        voiceList.selectedIndex = index;
      }
    });
  }

  // run the populateVoiceList function
  populateVoiceList();

  // run function once voices have loaded
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // get access to browser voice
  const utterance = new SpeechSynthesisUtterance();

  // - make the browser speak what I wrote with the selected voice
  function speakText() {
    // - get the name of the voice we chose
    const selectedVoiceName =
      voiceList.selectedOptions[0].getAttribute('data-name');
    // - get all the voices inside of the browser
    const voices = speechSynthesis.getVoices();
    // - find the voice that matches the one we chose
    const selectedVoice = voices.find(
      (voice) => voice.name === selectedVoiceName
    );

    // - set the the voice
    utterance.voice = selectedVoice;
    utterance.text = textInput.value;

    // - make the computer talk
    speechSynthesis.speak(utterance);
  }

  speakButton.addEventListener('click', speakText);
}