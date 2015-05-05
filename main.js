var context, // audio context
	referenceOscillator,
	testingOscillator,
	centDifference = 300,
	level = 0;

$(document).ready(function () {
	context = new (window.AudioContext || window.webkitAudioContext)();

	// create oscillators
	referenceOscillator = createOscillator(440);
	testingOscillator = createOscillator(440);

	play();
});

function play() {
	var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	testingOscillator = createOscillator(440 + plusOrMinus * diffInCentsFrom(440, centDifference));


	// start
	referenceOscillator.start(0);
	testingOscillator.start(1.0);

	// stop
	referenceOscillator.stop(2);
	testingOscillator.stop(2);
}

function createOscillator(freq) {
	var oscillator = context.createOscillator();
	oscillator.frequency.value = freq;

	var gainNode = context.createGain();
	gainNode.gain.value = 0.2;

	/* Connections */
	oscillator.connect(gainNode)
	gainNode.connect(context.destination);

	return oscillator;
}

function startTestingOscillator() {
	testingOscillator.start(0);
}

function diffInCentsFrom(freq, cents) {
	return freq * Math.pow(2, cents/1200) - freq;
}