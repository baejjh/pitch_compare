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

	// hide game over
	$('#flash-banner').hide();

	play();
});

function play() {
	// make sure to pause if already playing, aka user pressed very quickly
	referenceTone.pause();
	testingTone.pause();

	// determine the next tone
	plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	testingTone.setFrequency(440 + plusOrMinus * diffInCentsFrom(440, centDifference));

	// start
	referenceTone.playFor(1000);
	testingTone.playFor(1000, 1000);
}

function answer() {
	if (this.id == 'up' && plusOrMinus == 1 ||
		this.id == 'down' && plusOrMinus == -1)
	{
		level += 1;
		centDifference = centDifference * .7;
	} else {
		level = 0;
		centDifference = 50;

		$('#flash-banner').slideToggle("fast", function() {
			setTimeout(function() {
				$('#flash-banner').slideToggle("slow");
			}, 1000);
		});
	}

	$('#level').html('Level ' + level + '<br>' + centDifference.toFixed(2) + '%');
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