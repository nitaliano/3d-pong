var dispatcher = require('./dispatcher');

module.exports = Hud;

function Hud($el) {
	this.$pausePlayBtn = $el.getElementsByClassName('hud-pause-play')[0];
	this.$playerScore = $el.getElementsByClassName('hud-score-player')[0];
	this.$aiScore = $el.getElementsByClassName('hud-score-ai')[0];
	this.onPausePlayClick = this.onPausePlayClick.bind(this);
	this.reset = this.reset.bind(this);
	this.onScore = this.onScore.bind(this);
	this.events();
}

Hud.prototype.events = function () {
	this.$pausePlayBtn.addEventListener('click', this.onPausePlayClick);
	dispatcher.subscribe('score', this.onScore);
	dispatcher.subscribe('nextlevel', this.reset);
};

Hud.prototype.reset = function () {
	this.$playerScore.innerText = 0;
	this.$aiScore.innerText = 0;
};

Hud.prototype.onScore = function (paddle) {
	if (paddle.position.x < 0) {
		this.$playerScore.innerText = paddle.components.score.current;
	} else {
		this.$aiScore.innerText = paddle.components.score.current;
	}
};

Hud.prototype.onPausePlayClick = function () {
	if (this.$pausePlayBtn.classList.contains('hud--play')) {
		this.$pausePlayBtn.classList.remove('hud--play');
		this.$pausePlayBtn.classList.add('hud--pause');
		this.$pausePlayBtn.innerText = 'Play';
		dispatcher.publish('pause');
	} else {
		this.$pausePlayBtn.classList.remove('hud--pause');
		this.$pausePlayBtn.classList.add('hud--play');
		this.$pausePlayBtn.innerText = 'Pause';
		dispatcher.publish('play');
	}
};

Hud.prototype.dispose = function () {
	dispatcher.unsubscribe('score', this.onScore);
	dispatcher.unsubscribe('nextlevel', this.reset);
	this.$pausePlayBtn.removeEventListener('click', this.onPausePlayClick);
};