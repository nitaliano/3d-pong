var entityFactory = require('../factory/entityfactory'),
	DiamondSquare = require('../core/diamondsquare'),
	Level = require('../core/level'),
	THREE = require('three.js'),
	util = require('util'),
	dispatcher = require('../core/dispatcher');

module.exports = LevelOne;

function LevelOne(renderer, camera, overlay) {
	LevelOne.super_.call(this, renderer, camera, overlay);
}

util.inherits(LevelOne, Level);

LevelOne.prototype.setup = function () {
	this.addSettingOverride('difficulty', 'EASY');

	// background color
	this.renderer.setClearColor('#00bfff');

	// setup camera
	this.camera.position.x = -1500;
	this.camera.position.z = -200;
	this.camera.rotation.x = -Math.PI / 2;
	this.camera.rotation.y = -Math.PI / 2;

	// board
	this.entities.board = entityFactory.board();
	var boardBoundingBox = this.entities.board.geometry.boundingBox;

	// two ai players
	this.entities.player = entityFactory.paddle();
	this.entities.ai = entityFactory.aiPaddle();
	var paddleBoundingBox = this.entities.player.geometry.boundingBox;
	this.entities.player.position.x = boardBoundingBox.min.x + paddleBoundingBox.max.x;
	this.entities.ai.position.x = boardBoundingBox.max.x + paddleBoundingBox.min.x;
	this.entities.board.add(this.entities.player);
	this.entities.board.add(this.entities.ai);

	// ball
	this.entities.ball = entityFactory.ball();
	this.entities.board.add(this.entities.ball);

	// lights
	var stadiumLights = new THREE.Object3D();

	var light1 = new THREE.PointLight('#ffffff');
	light1.position.set(0, 640, -300);

	var light2 = new THREE.PointLight('#ffffff');
	light2.position.set(0, -640, -300);

	var light3 = new THREE.PointLight('#ffffff');
	light3.position.set(640, 0, -300);

	var light4 = new THREE.PointLight('#ffffff');
	light4.position.set(-640, 0, -300);

	stadiumLights.add(light1);
	stadiumLights.add(light2);
	stadiumLights.add(light3);
	stadiumLights.add(light4);

	// mountains
	var diamondSquare = new DiamondSquare(4, 25);
	var mountainGeometry = new THREE.PlaneGeometry(4 * window.innerHeight, 4 * window.innerWidth, diamondSquare.size, diamondSquare.size);
	diamondSquare.generate();
	diamondSquare.project(mountainGeometry);

	var mountainMaterial = new THREE.MeshLambertMaterial({
		color: '#a0522d',
		side: THREE.DoubleSide,
		fog: true
	});

	var mountains = new THREE.Mesh(mountainGeometry, mountainMaterial);
	mountains.geometry.computeBoundingBox();
	mountains.position.z = this.entities.board.geometry.boundingBox.max.z + mountains.geometry.boundingBox.max.z;
	mountains.rotation.y = Math.PI;

	this.stage.add(mountains);
	this.stage.add(stadiumLights);
	this.stage.add(this.entities.board);

	this.systems = [
		require('../systems/ai'),
		require('../systems/input'),
		require('../systems/collision'),
		require('../systems/bounds'),
		require('../systems/animation'),
		require('../systems/score')
	];

	this.onScore = this.onScore.bind(this);
	dispatcher.subscribe('score', this.onScore);
};

LevelOne.prototype.intro = function () {
	if (this.camera.position.x === -800) {
		this.overlay.show('hud');
		this.entities.ball.rotateOnAxis(new THREE.Vector3(0, 1, 0), 7.29);
		this.entities.ball.components.velocity.set(150, -150, 0);
		return;
	}

	if (this.camera.position.x !== -800) {
		this.camera.position.x += 4;
	}

	requestAnimationFrame(this.intro);
};

LevelOne.prototype.onScore = function () {
	var boardBoundingBox = this.entities.board.geometry.boundingBox;
	var paddleBoundingBox = this.entities.player.geometry.boundingBox;
	this.entities.player.position.x = boardBoundingBox.min.x + paddleBoundingBox.max.x;
	this.entities.ai.position.x = boardBoundingBox.max.x + paddleBoundingBox.min.x;
	this.entities.ball.position.set(0, 0, 0);
	this.entities.ball.components.velocity.multiplyScalar(-1);
};

LevelOne.prototype.dispose = function () {
	this.overlay.hide();
	dispatcher.unsubscribe('score', this.onScore);
};