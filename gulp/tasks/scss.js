import dartSass from 'sass' //sass modul
import gulpSass from 'gulp-sass' // gulp sass
import rename from 'gulp-rename' // переименование файлов
import cleanCss from 'gulp-clean-css' // сжатие css
import webpcss from 'gulp-webpcss' // поддержка webp внутри css
import autoprefixer from 'gulp-autoprefixer' //автопрефиксер
import groupCssMediaQueries from 'gulp-group-css-media-queries' // групировка медиа запросов
import sourcemaps from 'gulp-sourcemaps'

const sass = gulpSass(dartSass)

export const scss = () => {
	return (
		app.gulp
			.src(app.path.src.scss, { sourcemaps: app.isDev })
			.pipe(sourcemaps.init())
			//Вывод ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'SCSS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			//замена @img на ../img/
			.pipe(app.plugins.replace(/@img\//g, '../img/'))
			//перевод sass в css
			.pipe(
				sass({
					outputStyle: 'expanded',
				})
			)
			// групировка медиа запросов
			.pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
			// поддержка webp внутри css
			.pipe(
				app.plugins.if(
					app.isBuild,
					webpcss({
						webpClass: '.webp',
						nowebpClass: '.no-webp',
					})
				)
			)
			//автопрефиксер
			.pipe(
				app.plugins.if(
					app.isBuild,
					autoprefixer({
						grid: true,
						overrideBrowserlist: ['last 3 versions'],
						cascade: true,
					})
				)
			)

			//не сжатый файл в dist
			.pipe(app.gulp.dest(app.path.build.css))
			// сжатие css
			.pipe(app.plugins.if(app.isBuild, cleanCss()))
			// переименование в .min.css
			.pipe(
				rename({
					extname: '.min.css',
				})
			)
			.pipe(sourcemaps.write('./'))
			// сжатый файл в dist
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.browsersync.stream())
	)
}
