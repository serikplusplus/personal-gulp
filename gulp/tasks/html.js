import fileInclude from 'gulp-file-include' //правильное подключение компонентов @@include
import webpHtmlNosvg from 'gulp-webp-html-nosvg' //автомат вставка webp в html
import versionNumber from 'gulp-version-number' //добавление версии к js и css файлам
import htmlmin from 'gulp-htmlmin'

export const html = () => {
	return (
		app.gulp
			.src(app.path.src.html)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'HTML',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			//правильное подключение компонентов
			.pipe(fileInclude())
			//Замена @img в путях картинок на img/
			.pipe(app.plugins.replace(/@img\//g, 'img/'))
			//Вставка Webp
			.pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
			//Добавление версий
			.pipe(
				app.plugins.if(
					app.isBuild,
					versionNumber({
						value: '%DT%',
						append: {
							key: '_v',
							cover: 0,
							to: ['css', 'js'],
						},
						output: {
							file: 'gulp/version.json',
						},
					})
				)
			)
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.if(app.isBuild, app.gulp.src(`${app.path.srcFolder}/robots.txt`, {})))
			.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.html)))
			.pipe(app.plugins.browsersync.stream())
	)
}
