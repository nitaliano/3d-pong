var THREE = require('three.js');

module.exports = Level;

function Level(renderer, camera, overlay) {
	this.renderer = renderer;
	this.camera = camera;
	this.overlay = overlay;
	this.entities = {};
	this.systems = [];
	this.stage = new THREE.Object3D();
	this.settingOverride = {};
	this.intro = this.intro.bind(this);
}

Level.prototype.addSettingOverride = function (key, value) {
	this.settingOverride[key] = value;
};

Level.prototype.removeSettingOverride = function (key) {
	delete this.settingOverride[key];
};

Level.prototype.setup = function () {};
Level.prototype.intro = function () {};
Level.prototype.dispose = function () {};