var THREE = require('three.js');

module.exports = {
	REACTION: {
		EASY: 30,
		NORMAL: 20,
		NIGHTMARE: 15
	},
	MOVEMENT: {
		EASY: new THREE.Vector3(0, 1, 0),
		NORMAL: new THREE.Vector3(0, 2.5, 0),
		NIGHTMARE: new THREE.Vector3(0, 2.5, 0)
	}
};