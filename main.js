var referenceTone,
	testingTone,
	plusOrMinus,
	centDifference = 50,
	level = 0;

$(document).ready(function () {
	var context = new (window.AudioContext || window.webkitAudioContext)();

	referenceTone = new Tone(context);
	testingTone = new Tone(context);

	// get button clicks
	$('#up').click(answer);
	$('#down').click(answer);

	play();
});

function play() {
	plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	testingTone.setFrequency(440 + plusOrMinus * diffInCentsFrom(440, centDifference));

	// start
	referenceTone.playFor(2000);
	testingTone.playFor(1000, 1000);
}

function answer() {
	if (this.id == 'up' && plusOrMinus == 1 ||
		this.id == 'down' && plusOrMinus == -1)
	{
		level += 1;
		centDifference = centDifference * .9;
	} else {
		level = 0;
		centDifference = 50;
	}

	$('#level').html('Level ' + level + '<br>' + centDifference.toFixed(0) + '%');
	play();
}

function createOscillator(freq) {
	var oscillator = context.createOscillator();
	oscillator.frequency.value = freq;

	/* Connections */
	oscillator.connect(gainNode)

	return oscillator;
}

function startTestingOscillator() {
	testingOscillator.start(0);
}

function diffInCentsFrom(freq, cents) {
	return freq * Math.pow(2, cents/1200) - freq;
}