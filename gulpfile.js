//Gulp modules
var gulp = require('gulp'),
	connect = require('gulp-connect'),
    history = require('connect-history-api-fallback'),
	open = require('gulp-open'),
	sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jsonminify = require('gulp-jsonminify'),
    minifyhtml = require('gulp-minify-html'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch');

//Config
var environment = 'local', //(local|dev|prod)
	bowerFolder = 'source/bower_components'
	host = 'localhost',
	port = '8080';

//Datas
var htmlFiles = [
        'source/shared/**/*.html',
        'source/components/**/*.html',
        'source/modules/**/*.html'
    ],
    sassFiles = [
        'source/sass/**/*.scss',
        'source/components/**/*.scss',
        'source/shared/**/*.scss',
        'source/modules/**/*.scss'
    ],
    jsFiles = [
        'source/app.module.js',
        'source/app.config.js',
        'source/components/**/*.js',
        'source/services/**/*.js',
        'source/shared/**/*.js',
        'source/modules/**/*.module.js',
        'source/modules/**/*.js'
    ];

//Gulp tasks
gulp.task('connectTask', connectTask);
gulp.task('openTask', openTask);
gulp.task('sassTask', sassTask);
gulp.task('jsTask', jsTask);
gulp.task('jsonTask', jsonTask);
gulp.task('htmlTask', htmlTask);
gulp.task('bowerTask', bowerTask);
gulp.task('assetsTask', assetsTask);
gulp.task('injectTask', injectTask);
gulp.task('watch', watchTask);
gulp.task('local', localTask);
gulp.task('dev', devTask);
gulp.task('recette', recetteTask);
gulp.task('prod', prodTask);
gulp.task('default', ['local']);

///////////////

/**
 * Sync modifications to browser
 */
function connectTask() {
	var parameters = {
		host: host,
		port: port,
		root: environment,
		livereload: true,
        middleware: function() {
            return [history()];
        }
	};

	connect.server(parameters);
}

/**
 * Open browser
 */
function openTask() {
	var parameters = {
		uri: 'http://' + host + ':' + port
	}

	return gulp
		.src(__filename)
		.pipe(open(parameters));
}

/**
 * Sass Task
 */
function sassTask() {
	 var concatTask = gulp
        .src([
            'source/modules/**/*.scss',
            'source/shared/**/*.scss',
            'source/components/**/*.scss',
            'source/sass/_fonts.scss',
            'source/sass/_global.scss',
            'source/sass/screen.scss'
        ])
        .pipe(concat('screen.scss'))

     var parameters = {};

    if(environment == 'prod')
		parameters.outputStyle = 'compressed';

    return concatTask
        .pipe(plumber())
        .pipe(sass(parameters).on('error', sass.logError))
        .pipe(plumber.stop())
        .pipe(gulp.dest(environment + '/css'))
        .pipe(connect.reload());
}

/**
 * JS task
 */
function jsTask() {
    var task = gulp
        .src(jsFiles)
        .pipe(concat('app.js'));

    if(environment == 'prod') {
        task
            .pipe(plumber())
            .pipe(uglify())
            .pipe(plumber.stop())
            .pipe(rename(function(path) {
                path.basename += '.min';
            }))
    }

    return task
        .pipe(gulp.dest(environment + '/app'))
        .pipe(connect.reload());
}

/**
 * Get all the bower dependencies
 */
function bowerTask() {
	var bowerComponents = [
		bowerFolder + '/angular/angular.min.js',
		bowerFolder + '/angular-route/angular-route.min.js',
		bowerFolder + '/angular/angular.min.js.map',
		bowerFolder + '/angular-route/angular-route.min.js.map'
	];

	return gulp
		.src(bowerComponents)
		.pipe(gulp.dest(environment + '/vendor'));
}

/**
 * Put all assets in the environment folder
 */
function assetsTask() {
	//Favicons
    gulp.src('source/assets/favicon/*')
		.pipe(gulp.dest(environment + '/favicon'));
	//Fonts
    gulp.src('source/assets/fonts/**/*')
		.pipe(gulp.dest(environment + '/fonts'));
	//Images
    return gulp.src('source/assets/images/**/*')
		.pipe(gulp.dest(environment + '/img'));
}

/**
 * Inject dependencies in index.html file
 */
function injectTask() {
    var css = environment + '/css/screen.css',
        app = (environment == 'prod') ? environment + '/app/app.min.js' : environment + '/app/app.js',
        bower = [
            environment + '/vendor/angular.min.js',
            environment + '/vendor/angular-route.min.js',
        ];

    return gulp
        .src('source/index.html')
        .pipe(gulp.dest(environment))
        .pipe(inject(gulp.src(css, {read: false}), {name: 'css', relative: true, addRootSlash: true}))
        .pipe(inject(gulp.src(app, {read: false}), {name: 'app', relative: true, addRootSlash: true}))
        .pipe(inject(gulp.src(bower, {read: false}), {name: 'vendor', relative: true, addRootSlash: true}))
        .pipe(gulp.dest(environment))
        .pipe(connect.reload());
}

/**
 * Copy json files
 */
function jsonTask() {
    gulp
        .src('source/data/*.json')
        .pipe(plumber())
        .pipe(jsonminify())
        .pipe(plumber.stop())
        .pipe(gulp.dest(environment + '/data'))
        .pipe(connect.reload())

    return gulp
        .src('source/resources/*.json')
        .pipe(plumber())
        .pipe(jsonminify())
        .pipe(plumber.stop())
        .pipe(gulp.dest(environment + '/resources'))
        .pipe(connect.reload());
}

/**
 * Copy html files
 */
function htmlTask() {
    return gulp
        .src(htmlFiles)
        .pipe(plumber())
        .pipe(minifyhtml())
        .pipe(plumber.stop())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(environment + '/partials'))
        .pipe(connect.reload());
}

/**
 * Watch
 */
function watchTask() {
    watch(jsFiles, jsTask);
    watch(sassFiles, sassTask);
    watch('source/resources/*.json', jsonTask);
    watch(htmlFiles, htmlTask);
    watch(jsFiles, jsTask);
    watch('source/index.html', injectTask);
}

/**
 * All tasks
 */
function runAllTasks() {
    runSequence('bowerTask', 'jsTask', 'sassTask', 'jsonTask', 'htmlTask', 'assetsTask', injectTask);
}

/**
 * Set Local environment
 */
function localTask() {
    environment = 'local';

    runAllTasks();
    connectTask();
    openTask();
    watchTask();
}

/**
 * Set Dev environment
 */
function devTask() {
    environment = 'dev';

    runAllTasks();
}

/**
 * Set Recette environment
 */
function recetteTask() {
    environment = 'recette';

    runAllTasks();
}

/**
 * Set Prod environment
 */
function prodTask() {
    environment = 'prod';

    runAllTasks();
}
