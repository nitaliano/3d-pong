var THREE = require('three.js');

var caster = new THREE.Raycaster();

var rays = [
	new THREE.Vector3(0, 1, 0),
	new THREE.Vector3(0, -1, 0),
	new THREE.Vector3(1, 0, 0),
	new THREE.Vector3(-1, 0, 0)
];

module.exports = function (entities) {
	if (entities.ball.position.x < 0) {
		paddleBallCollision(entities.player, entities.ball);
	} else {
		paddleBallCollision(entities.ai, entities.ball);
	}
};

function paddleBallCollision(paddle, ball) {
	var collision;

	for (var i = 0; i < rays.length; i++) {
		caster.set(ball.position, rays[i]);

		collision = caster.intersectObject(paddle);
		if (collision.length && collision[0].distance <= ball.geometry.boundingBox.max.x) {
			if (rays[i].x) {
				ball.components.velocity.x *= -1;
			} else {
				ball.components.velocity.y *= -1;
			}
			ball.components.audio.play();
			break;
		}
	}
}