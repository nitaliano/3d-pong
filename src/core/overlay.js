var layouts = require('./layouts');

module.exports = Overlay;

function Overlay() {
	this.$el = document.getElementById('overlay-container');
	this.currentLayout = null;
}

Overlay.prototype.show = function (id) {
	if (this.currentLayout) {
		this.currentLayout.dispose();
		this.$el.removeChild(this.currentLayout.$el);
	}

	this.currentLayout = layouts.get(id);
	this.$el.appendChild(this.currentLayout.$el);
	this.currentLayout.createInstance(this.$el);

	if (!this.isVisible()) {
		this.$el.classList.remove('hidden');
	}
};

Overlay.prototype.hide = function () {
	if (this.isVisible()) {
		this.$el.classList.add('hidden');
	}
};

Overlay.prototype.isVisible = function () {
	return !this.$el.classList.contains('hidden');
};