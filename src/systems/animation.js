module.exports = function (entities, game) {
	Object.keys(entities).forEach(function (key) {
		if (entities[key].components.animation && entities[key].components.velocity) {
			entities[key].position.add(entities[key].components.velocity.clone().multiplyScalar(game.dt));
		}
	});
};