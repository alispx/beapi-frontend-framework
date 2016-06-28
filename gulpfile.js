/*Load all plugin define in package.json*/
var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins(),
	sass = require('gulp-sass'),
	path = require('path'),
	minifyCSS = require('gulp-clean-css'),
	concat = require('gulp-concat-sourcemap'),
	iconfont = require('gulp-iconfont'),
	consolidate = require('gulp-consolidate'),
	pxtorem = require('gulp-pxtorem'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	imageop = require('gulp-image-optimization'),
	favicons = require('gulp-favicons'),
	through = require('through2'),
	php = require('gulp-connect-php');


var pxtoremOptions = {
	replace: false,
	prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'padding', 'border', 'border-top', 'border-left', 'border-bottom', 'border-right', 'border-radius', 'width', 'height', 'top', 'left', 'bottom', 'right']
};

/*Php server*/
gulp.task('php', function() {
	php.server({ base: '.', port: 9090, keepalive: true});
});

/*Set server*/
gulp.task('browser-sync', ['php'], function() {
	browserSync({
        proxy: '127.0.0.1:9090',
        port: 9090,
        open: true,
        notify: false
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
	browserSync.reload();
});

// Favicon Task
// https://github.com/haydenbleasel/gulp-favicons
// https://github.com/haydenbleasel/favicons
gulp.task('favicons', function () {

	gulp.src('assets/img/favicons/favicon_src.png')
		.pipe(favicons({
			settings: {
				background: null ,
				vinylMode: true
			},
			icons: {
				android: true,            // Create Android homescreen icon. `boolean`
				appleIcon: true,          // Create Apple touch icons. `boolean`
				appleStartup: false,       // Create Apple startup images. `boolean`
				coast: false,              // Create Opera Coast icon. `boolean`
				favicons: true,           // Create regular favicons. `boolean`
				firefox: true,            // Create Firefox OS icons. `boolean`
				opengraph: true,          // Create Facebook OpenGraph. `boolean`
				windows: true,            // Create Windows 8 tiles. `boolean`
				yandex: false              // Create Yandex browser icon. `boolean`
			}
		}, function(code) {
			console.log(code);
		}))
		.pipe(through.obj(function (file, enc, cb) {
			console.log(file.path);
			this.push(file);
			cb();
		}))
		.pipe(gulp.dest('./assets/img/favicons/'));
}); 

/*Icon font task*/
gulp.task('iconfont', function(){
	gulp.src(['assets/img/icons/*.svg'])
		.pipe(iconfont({
			fontName: 'bea_icons',
			normalize: true,
			fontHeight: 1001
		}))
		.on('codepoints', function(codepoints, options) {
			gulp.src('assets/css/vendor/_icons.scss')
				.pipe(consolidate('lodash', {
					glyphs: codepoints,
					fontName: 'bea_icons',
					fontPath: '../../assets/fonts/',
					className: 'icon'
				}))
				.pipe(gulp.dest('./assets/css/components'));
			})
			.pipe(gulp.dest('./assets/fonts'));
});

/*Image minification*/
gulp.task('imgmin', function(cb) {
	gulp.src(['assets/img/*.png','assets/img/*.jpg','assets/img/*.gif','assets/img/*.jpeg']).pipe(imageop({
		optimizationLevel: 5,
		progressive: true,
		interlaced: true
	})).pipe(gulp.dest('./assets/img')).on('end', cb).on('error', cb);
});

/*JS task*/
gulp.task('dev-vendor-js', function () {
	return gulp.src(['assets/js/vendor/*.min.js', 'assets/js/vendor/*-min.js', 'assets/js/vendor/**/*-min.js', 'assets/js/vendor/**/*.min.js', '!assets/js/vendor/{jquery,jquery/**}'])
		.pipe(plugins.concat('vendor.min.js'))
		.pipe(gulp.dest('assets/js'));
});

gulp.task('dev-check-js', function () {
	// Concat the vendor and the src
	return gulp.src( ['assets/js/src/*.js'] )
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('dist-all-js', function () {
	// Make a vendor
	gulp.src(['assets/js/vendor/*.js'])
		.pipe(plugins.concat('vendor.min.js'))
		.pipe(gulp.dest('assets/js'));

	// Make the rest
	return gulp.src(['assets/js/vendor.min.js', 'assets/js/src/*.js'])
		.pipe(plugins.uglify())
		.pipe(concat('scripts.min.js', { sourceRoot : '../../' }))
		.pipe(gulp.dest('assets/js/'));
});


/* SASS Task */
gulp.task('dev-sass', function () {
	gulp.src('assets/css/style.scss')
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(plugins.concat('style.dev.css'))
		.pipe(pxtorem(pxtoremOptions))
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('dist-sass', function () {
	gulp.src('assets/css/style.scss')
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(plugins.concat('style.min.css'))
		.pipe(minifyCSS())
		.pipe(pxtorem(pxtoremOptions))
		.pipe(gulp.dest('./assets/css'));
});


// Critical Var
var color = require('gulp-color'),
	penthouse = require('penthouse'),
    path = require('path'),
    fs = require('fs');

// Define your env.
var 	_configCritical = JSON.parse(fs.readFileSync('assets/css/critical/conf/bea-critical-conf.json', 'utf8')),
		_envUrl = _configCritical.envUrl;

function funcPenthouse(_width, _height, _viewport, _url, _page) {
	penthouse({
		url : _url,
		css : path.join('assets/css/style.min.css'),
		// OPTIONAL params
		width : _width,   // viewport width
		height : _height,   // viewport height
		forceInclude : [
			// '.keepMeEvenIfNotSeenInDom',
			// /^\.regexWorksToo/
		],
		timeout: 30000, // ms; abort critical css generation after this timeout
		strict: false, // set to true to throw on css errors (will run faster if no errors)
		maxEmbeddedBase64Length: 1000, // charaters; strip out inline base64 encoded resources larger than this
		userAgent: 'Penthouse Critical Path CSS Generator' // specify which user agent string when loading the page
		/* phantomJsOptions: { // see `phantomjs --help` for the list of all available options
			'proxy': 'http://proxy.company.com:8080',
			'ssl-protocol': 'SSLv3'
		} */
	},
	function(err, criticalCss) {
		fs.writeFileSync('assets/css/critical/'+ _page + '-' + _viewport +'.css', criticalCss);
		console.log(color('Critical CSS successfully generated for [[ page ' + _page + ' ]]   [[ '+ _viewport + ' viewport ]]   [[ ' + _url + ' ]]', 'GREEN'));
	});
}

// Test generate critical css
gulp.task('critical-css', function() {
	_configCritical.pages.forEach( function(page) {
		page.url = _envUrl + page.url;
		_configCritical.viewports.forEach( function(viewport) {
			funcPenthouse(viewport.width, viewport.height, viewport.name, page.url, page.name);
		});
	});
});

// On default task, just compile on demand
gulp.task('default', function() {
	gulp.watch('assets/js/src/*.js', [ 'dev-check-js', 'dist-all-js' ]);
	gulp.watch('assets/js/vendor/*.js', [ 'dev-vendor-js', 'dist-all-js' ]);
	gulp.watch(['assets/css/*.scss', 'assets/css/**/*.scss'], ['dev-sass', 'dist-sass']);
	gulp.watch(['assets/img/icons/*.svg'], ['iconfont', 'dev-sass', 'dist-sass']);
});
// Browser sync with local setup.
gulp.task('serve', ['browser-sync'], function() {
	gulp.watch('assets/js/src/*.js', [ 'dev-check-js', 'dist-all-js' ]);
	gulp.watch('assets/js/vendor/*.js', [ 'dev-vendor-js', 'dist-all-js' ]);
	gulp.watch(['assets/css/*.scss', 'assets/css/**/*.scss'], ['dev-sass', 'dist-sass']);
	gulp.watch(['assets/img/icons/*.svg'], ['iconfont', 'dev-sass', 'dist-sass']);
	gulp.watch(['html/**/*.php', 'assets/css/style.dev.css', 'assets/css/style.min.css', 'assets/js/scripts.min.js'], ['bs-reload']);
});