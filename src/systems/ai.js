var AI = require('../constants/ai'),
	THREE = require('three.js');

module.exports = function (entities, game, override) {
	Object.keys(entities).forEach(function (key) {
		if (entities[key].components.computer) {
			var difficulty = override.difficulty ? override.difficulty : game.settings.difficulty;
			var updatedPosition = getAiPaddlePosition(entities[key], entities.ball, game.dt, difficulty);

			setTimeout(function () {
				entities[key].position.copy(updatedPosition);
			}, AI.REACTION[override.difficulty ? override.difficulty : game.settings.difficulty]);
		}
	});
};

function getAiPaddlePosition(paddle, ball, dt, difficulty) {
	var paddlePosition = paddle.position.clone();

	// moves towards ball if ball is on the paddles side of the court
	if (isInPaddlesMovementZone(paddle.position, ball.position, ball.components.velocity)) {
		if (paddle.position.y < ball.position.y) {
			return paddlePosition
				.add(AI.MOVEMENT[difficulty])
				.add(paddle.components.velocity.clone().multiplyScalar(dt));
		}

		if (paddle.position.y > ball.position.y) {
			return paddlePosition
				.add(AI.MOVEMENT[difficulty].clone().multiplyScalar(-1))
				.add(paddle.components.velocity.clone().multiplyScalar(dt));
		}
	}

	// return back to origin if ball is on other end of court
	if (paddle.position.y < 0) {
		return paddlePosition.add(AI.MOVEMENT[difficulty]);
	}

	if (paddle.position.y > 0) {
		return  paddlePosition.add(AI.MOVEMENT[difficulty].clone().multiplyScalar(-1));
	}

	return paddlePosition;
}

function isInPaddlesMovementZone(pPos, bPos, bVel) {
	return (pPos.x < 0 && bPos.x < 0 && bVel.x < 0) || (pPos.x > 0 && bPos.x > 0 && bVel.x > 0);
}