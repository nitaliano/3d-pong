var Entity = require('../core/entity'),
	THREE = require('three.js');

var Components = {
	Animation: require('../components/animation'),
	Moveable: require('../components/moveable'),
	Velocity: require('../components/velocity'),
	Computer: require('../components/computer'),
	Score: require('../components/score'),
	Audio: require('../components/audio')
};

var Audio = {
	Collision: require('../assets/sounds/collision.ogg'),
	Score: require('../assets/sounds/score.ogg')
};

var Textures = {
	Board: THREE.ImageUtils.loadTexture(require('../assets/board_floor.png'))
};

module.exports = {
	ball: function (options) {
		var geometry = new THREE.SphereGeometry(8, 32, 32);
		var material = new THREE.MeshPhongMaterial({ color: '#0000ff', specular: 0x333333, shininess: 100 });

		return new Entity(geometry, material)
			.addComponent(new Components.Velocity())
			.addComponent(new Components.Animation())
			.addComponent(new Components.Audio(Audio.Collision));
	},

	board: function (options) {
		var geometry = new THREE.BoxGeometry(640, 320, 32);

		var materials = [];

		// sides
		var sideMaterialOptions = { transparent: true, color: '#000000', opacity: 0.3, side: THREE.DoubleSide };
		materials.push(new THREE.MeshBasicMaterial(sideMaterialOptions));
		materials.push(new THREE.MeshBasicMaterial(sideMaterialOptions));
		materials.push(new THREE.MeshBasicMaterial(sideMaterialOptions));
		materials.push(new THREE.MeshBasicMaterial(sideMaterialOptions));

		// bottom
		materials.push(new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide, map: Textures.Board }));

		// top
		materials.push(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));

		return new Entity(geometry, new THREE.MeshFaceMaterial(materials))
			.addComponent(new Components.Audio(Audio.Score));
	},

	paddle: function (options) {
		var geometry = new THREE.BoxGeometry(16, 64, 32);
		var material = new THREE.MeshPhongMaterial({ color: '#ccc000', specular: 0x333333, shininess: 100 });

		return new Entity(geometry, material)
			.addComponent(new Components.Velocity())
			.addComponent(new Components.Moveable())
			.addComponent(new Components.Animation())
			.addComponent(new Components.Score());
	},

	aiPaddle: function () {
		var geometry = new THREE.BoxGeometry(16, 64, 32);
		var material = new THREE.MeshPhongMaterial({ color: '#ff0000', specular: 0x333333, shininess: 100 });

		return new Entity(geometry, material)
			.addComponent(new Components.Computer())
			.addComponent(new Components.Velocity())
			.addComponent(new Components.Animation())
			.addComponent(new Components.Score());
	}
};