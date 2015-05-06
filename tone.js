function Tone(audioContext, frequency, gain) {
	this.frequency = frequency;
	this.gain = gain;
	this.gainNode = audioContext.createGain();

	// default params
	if (typeof(frequency) === 'undefined') this.frequency = 440;
	if (typeof(gain) === 'undefined') this.gain = 0;

	// create oscillator
	this.oscillator = audioContext.createOscillator();
	this.oscillator.frequency.value = this.frequency;

	// connect oscillator to gainNode
	// then connect gainNode to output
	this.oscillator.connect(this.gainNode);
	this.gainNode.connect(audioContext.destination);

	// start it!
	this.oscillator.start();
 
 	this.playFor = function (timeInMilliseconds) {
 		this.gainNode.gain.value = .2;
 		console.log(this);
 		var self = this;
 		setTimeout(function() { self.gainNode.gain.value = 0; }, timeInMilliseconds)
 	};
}
