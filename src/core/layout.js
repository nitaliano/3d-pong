var htmlParser = require('./htmlparser');

module.exports = Layout;

function Layout($scriptDomElement) {
	this.id = $scriptDomElement.id;
	this.$el = htmlParser.parse($scriptDomElement.innerText);
	this.instance = null;
	this.Class = require('./' + $scriptDomElement.id);
}

Layout.prototype.createInstance = function ($parentElement) {
	if (!this.instance) {
		this.instance = new this.Class($parentElement);
	}
};

Layout.prototype.dispose = function () {
	this.instance.dispose();
	this.instance = null;
};