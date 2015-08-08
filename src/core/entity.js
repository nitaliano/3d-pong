var THREE = require('three.js'),
	util = require('util');

module.exports = Entity;

function Entity(geometry, material) {
	Entity.super_.call(this, geometry, material);
	this.components = {};
	this.geometry.computeBoundingBox();
}

util.inherits(Entity, THREE.Mesh);

Entity.prototype.addComponent = function (component) {
	if (component && component.name) {
		this.components[component.name] = component;
	}
	return this;
};

Entity.prototype.removeComponent = function (component) {
	var componentName = component;

	if (typeof component === 'function') {
		componentName = component.name;
	}

	delete this.components[componentName];
	return this;
};