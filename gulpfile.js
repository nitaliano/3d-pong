var gulp = require('gulp'),
	del = require('del'),
	webpack = require('webpack'),
	runSequence = require('run-sequence'),
	watch = false;

gulp.task('clean', function () {
	del(['build/*', '!build/font', '!build/sounds']);
});

gulp.task('bundle', function () {
	var bundler = webpack(require('./webpack.config.js'));

	if (watch) {
		bundler.watch(200, bundle);
	} else {
		bundler.run(bundle);
	}
});

gulp.task('build', function () {
	runSequence(['clean', 'bundle']);
});

gulp.task('build:watch', function () {
	watch = true;
	runSequence(['build']);
});

function bundle(err, stats) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(stats.toString());
}