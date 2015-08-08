var boundingBox;

module.exports = function (entities) {
	if (!boundingBox) {
		boundingBox = entities.board.geometry.boundingBox;
	}
	placePaddleInBounds(entities.player);
	placePaddleInBounds(entities.ai);
	placeBallInBounds(entities.ball);
};

function placePaddleInBounds(paddle) {
	if (paddle.position.y + paddle.geometry.boundingBox.max.y > boundingBox.max.y) {
		paddle.position.y = boundingBox.max.y + paddle.geometry.boundingBox.min.y;
		paddle.components.velocity.y = 0;
	}

	if (paddle.position.y + paddle.geometry.boundingBox.min.y < boundingBox.min.y) {
		paddle.position.y = boundingBox.min.y + paddle.geometry.boundingBox.max.y;
		paddle.components.velocity.y = 0;
	}
}

function placeBallInBounds(ball) {
	if (ball.position.y + ball.geometry.boundingBox.max.y > boundingBox.max.y) {
		ball.position.y = boundingBox.max.y + + ball.geometry.boundingBox.min.y;
		ball.components.velocity.y *= -1;
		ball.components.audio.play();
	}

	if (ball.position.y + ball.geometry.boundingBox.min.y < boundingBox.min.y) {
		ball.position.y = boundingBox.min.y + + ball.geometry.boundingBox.max.y;
		ball.components.velocity.y *= -1;
		ball.components.audio.play();
	}
}