var dispatcher = require('./dispatcher');

module.exports = Menu;

function Menu($el) {
	this.$playBtn = $el.getElementsByClassName('menu-item')[0];
	this.onPlayClick = this.onPlayClick.bind(this);
	this.events();
}

Menu.prototype.events = function () {
	this.$playBtn.addEventListener('click', this.onPlayClick);
};

Menu.prototype.onPlayClick = function () {
	dispatcher.publish('start');
};

Menu.prototype.dispose = function () {
	this.$playBtn.removeEventListener('click', this.onPlayClick);
};