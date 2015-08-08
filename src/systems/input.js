var Keys = require('../constants/keys'),
	paddlePosition = 0,
	paddleVelocity = 0;

module.exports = function (entities) {
	Object.keys(entities).forEach(function (key) {
		if (entities[key].components.moveable) {
			entities[key].position.y += paddlePosition;
			entities[key].components.velocity.y = paddleVelocity;
		}
	});
};

document.addEventListener('keydown', function (e) {
	switch (e.keyCode) {
		case Keys.LEFT:
			paddlePosition -= 1;
			paddleVelocity = 0.5;
			break;
		case Keys.RIGHT:
			paddlePosition += 1;
			paddleVelocity = -0.5;
			break;
		default:
			break;
	}
});

document.addEventListener('keyup', function (e) {
	paddlePosition = 0;
	paddleVelocity = 0;
});