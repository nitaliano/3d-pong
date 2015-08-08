var THREE = require('three.js'),
	Overlay = require('./overlay'),
	dispatcher = require('./dispatcher');

var Levels = [
	require('../levels/intro'),
	require('../levels/one'),
	require('../levels/two')
];

module.exports = Game;

function Game() {
	this.$el = document.getElementById('webgl-container');

	this.settings = { difficulty: 'NIGHTMARE' };

	this.overlay = new Overlay();

	this.level = null;
	this.levelNumber = 0;

	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.$el.appendChild(this.renderer.domElement);

	this.scene = new THREE.Scene();
	this.clock = new THREE.Clock(true);
	this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);

	this.dt = 0;
	this.isPause = false;

	this.render = this.render.bind(this);
	this.loadLevel();
	this.events();

	requestAnimationFrame(this.render);
}

Game.prototype.events = function () {
	var self = this;

	dispatcher.subscribe('start', function () {
		self.levelNumber = 1;
		self.overlay.hide();
		self.loadLevel();
	});

	dispatcher.subscribe('nextlevel', function () {
		self.levelNumber++;

		if (self.levelNumber === Levels.length) {
			self.levelNumber = 0;
		}

		self.loadLevel();
	});

	dispatcher.subscribe('pause', function () {
		self.isPause = true;
		self.clock.stop();
	});

	dispatcher.subscribe('play', function () {
		self.isPause = false;
		self.clock.start();
		requestAnimationFrame(self.render);
	});

	document.addEventListener('visibilitychange', function () {
		if (self.clock.running) {
			self.clock.stop();
		} else {
			self.clock.start();
		}
	});
};

Game.prototype.loadLevel = function () {
	if (this.level) {
		this.level.dispose();
		this.scene.remove(this.level.stage);
	}
	this.level = new Levels[this.levelNumber](this.renderer, this.camera, this.overlay);
	this.level.setup();
	this.level.intro();
	this.scene.add(this.level.stage);
};

Game.prototype.render = function () {
	if (this.isPause) {
		return;
	}

	for (var i = 0; i < this.level.systems.length; i++) {
		this.level.systems[i](this.level.entities, this, this.level.settingOverride);
	}

	this.renderer.render(this.scene, this.camera);
	requestAnimationFrame(this.render);
	this.dt = this.clock.getDelta();
};