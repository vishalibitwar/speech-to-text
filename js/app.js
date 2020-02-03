var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var sentences = ['This can be anything.', 'What are you doing? ', 'hey, What\'s going on?', 'There can also be very very long sentences.', 'Take a pause.', 'There can be a Pause, Like this...'];


var grammar = '#JSGF V1.0; grammar sentences; public <sentence> = ' + sentences.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var output = document.querySelector('#output');

document.getElementById('mic').addEventListener('click', function () {
  output.textContent = '';
  recognition.start();
  console.log('Ready to receive a color command.');
});

recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var result = event.results[last][0].transcript;
  output.textContent += result;
}

document.getElementById('stop').addEventListener('click', function () {
  recognition.stop();
});

recognition.onnomatch = function (event) {
  output.textContent = "I didn't recognise what you talk";
}

recognition.onerror = function (event) {
  output.textContent = 'Error occurred in recognition: ' + event.error;
}

// output.addEventListener('click', function () {
//   output.select();
//   document.execCommand('copy');
//   alert("copied to clipboard");
// });



