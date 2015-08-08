var util = require('util'),
	THREE = require('three.js');

module.exports = Velocity;

function Velocity(x, y, z) {
	Velocity.super_.call(this, x, y, z);
	this.name = 'velocity';
}

util.inherits(Velocity, THREE.Vector3);