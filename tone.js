function Tone(audioContext, frequency, gain) {
	// default params
	if (typeof(frequency) === 'undefined') frequency = 440;
	if (typeof(gain) === 'undefined') gain = 0;

	// create oscillator
	this.oscillator = audioContext.createOscillator();
	this.oscillator.frequency.value = frequency;

	// set gain
	this.gainNode = audioContext.createGain();
	this.gainNode.gain.value = gain;

	// connect oscillator to gainNode
	// then connect gainNode to output
	this.oscillator.connect(this.gainNode);
	this.gainNode.connect(audioContext.destination);

	// start it!
	this.oscillator.start();
 
 	this.playFor = function (timeInMilliseconds, delay) {
 		// capture this so we can use it inside anonymous functions
 		var self = this;

 		// if we are supposed to delay, call ourselves again in delay milliseconds
 		if (typeof(delay) !== 'undefined') {
 			setTimeout(function() { self.playFor(timeInMilliseconds); }, delay);
 			return;
 		}

 		this.gainNode.gain.value = .2;
 		console.log(this.oscillator.frequency.value);
 		setTimeout(function() { self.gainNode.gain.value = 0; }, timeInMilliseconds)
 	}; 

 	this.setFrequency = function (value) {
 		this.oscillator.frequency.value = value;
 	}
}
