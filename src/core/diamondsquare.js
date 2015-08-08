module.exports = DiamondSquare;

function DiamondSquare(detail, roughness) {
	this.size = Math.pow(2, detail) + 1;
	this.roughness = roughness;
	this.max = this.size - 1;
	this.map = new Float32Array(this.size * this.size);
}

DiamondSquare.prototype.get = function (x, y) {
	if (this.isOutOfBounds(x, y)) {
		return -1;
	}
	return this.map[x + this.size * y];
};

DiamondSquare.prototype.set = function (x, y, data) {
	if (!this.isOutOfBounds(x, y)) {
		this.map[x + this.size * y] = data;
	}
};

DiamondSquare.prototype.generate = function () {
	var half = this.max / 2;
	this.set(0, 0, this.max);
	this.set(this.max, 0, half);
	this.set(this.max, this.max, 0);
	this.divide(this.max);
};

DiamondSquare.prototype.divide = function (curSize) {
	var x, y, half = curSize / 2;
	var scale = this.roughness * curSize;

	if (half < 1) {
		return;
	}

	for (y = half; y <= this.max; y += curSize) {
		for (x = half; x <= this.max; x += curSize) {
			this.square(x, y, half, Math.random() * scale * 2 - scale);
		}
	}

	for (y = 0; y <= this.max; y += half) {
		for (x = (y + half) % curSize; x <= this.max; x += curSize) {
			this.diamond(x, y, half, Math.random() * scale * 2 - scale);
		}
	}

	this.divide(curSize / 2);
};

DiamondSquare.prototype.square = function (x, y, curSize, offset) {
	var avg = this.average([
		this.get(x - curSize, y - curSize),
		this.get(x + curSize, y - curSize),
		this.get(x + curSize, y + curSize),
		this.get(x - curSize, y + curSize)
	]);
	this.set(x, y, avg + offset);
};

DiamondSquare.prototype.diamond = function (x, y, curSize, offset) {
	var avg = this.average([
		this.get(x, y - curSize),
		this.get(x + curSize, y),
		this.get(x, y + curSize),
		this.get(x - curSize, y)
	]);
	this.set(x, y, avg + offset);
};

DiamondSquare.prototype.project = function (geometry) {
	var x, y, i = 0;

	for (x = 0; x < this.size; x++) {
		for (y = 0; y < this.size; y++) {
			geometry.vertices[i++].z = this.get(x, y);
		}
	}
};

DiamondSquare.prototype.average = function (arr) {
	var i, sum = 0;

	for (i = 0; i < arr.length; i++) {
		sum += arr[i];
	}

	return sum / arr.length;
};

DiamondSquare.prototype.isOutOfBounds = function (x, y) {
	return x < 0 || x > this.max || y < 0 || y > this.max;
};