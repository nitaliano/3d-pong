var Layout = require('./layout');

module.exports = new Layouts();

function Layouts() {
	this.layouts = {};

	var $layouts = document.querySelectorAll('script[type="text/html"]');
	for (var i = 0; i < $layouts.length; i++) {
		this.layouts[$layouts[i].id] = new Layout($layouts[i]);
	}
}

Layouts.prototype.get = function (id) {
	return this.layouts[id];
};