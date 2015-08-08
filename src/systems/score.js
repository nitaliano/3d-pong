var SCORE = require('../constants/score'),
	dispatcher = require('../core/dispatcher');

module.exports = function (entities) {
	Object.keys(entities).forEach(function (key) {
		if (entities[key].components.score) {
			checkIfScore(entities[key], entities.ball, entities.board);
		}
	});
};

function checkIfScore(paddle, ball, board) {
	var isScore = false;

	if (ball.position.x < board.geometry.boundingBox.min.x && paddle.position.x > 0) {
		isScore = true;
	} else if (ball.position.x > board.geometry.boundingBox.max.x && paddle.position.x < 0) {
		isScore = true;
	}

	if (isScore) {
		paddle.components.score.current++;
		board.components.audio.play();
		dispatcher.publish('score', paddle);

		if (paddle.components.score.current === SCORE.MAX) {
			dispatcher.publish('nextlevel');
		}
	}
}