var _ = require('lodash');

module.exports = new Dispatcher();

function Dispatcher() {
	this.store = {};
}

Dispatcher.prototype.publish = function (eventName, data) {
	if (this.store[eventName]) {
		this.store[eventName].forEach(function (eventCallback) {
			if (typeof eventCallback === 'function') {
				return eventCallback(data);
			}
		});
	}
};

Dispatcher.prototype.subscribe = function (eventName, eventCallback) {
	if (!this.store[eventName]) {
		this.store[eventName] = [eventCallback];
	} else {
		this.store[eventName].push(eventCallback);
	}
};

Dispatcher.prototype.unsubscribe = function (eventName, eventCallback) {
	if (!this.store[eventName]) {
		return;
	}

	_.remove(this.store[eventName], function (curEventCallback) {
		return eventCallback === curEventCallback;
	});

	if (this.store[eventName].length === 0) {
		delete this.store[eventName];
	}
};