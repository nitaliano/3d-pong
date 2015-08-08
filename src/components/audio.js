var THREE = require('three.js'),
	util = require('util'),
	audioListener = new THREE.AudioListener();

module.exports = Audio;

function Audio(file) {
	Audio.super_.call(this, audioListener);
	this.name = 'audio';
	this.load(file);
}

util.inherits(Audio, THREE.Audio);