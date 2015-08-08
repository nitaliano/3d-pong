module.exports = new HtmlParser();

function HtmlParser() {
	this.parser = new DOMParser();
}

HtmlParser.prototype.parse = function (htmlString) {
	var $document = this.parser.parseFromString(htmlString, 'text/html');
	return $document.body.firstChild;
};