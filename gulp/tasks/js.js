import webpack from 'webpack-stream' //sass modul
import gulpSass from 'gulp-sass' // gulp sass
import rename from 'gulp-rename' // переименование файлов
import cleanCss from 'gulp-clean-css' // сжатие css
import webpcss from 'gulp-webpcss' // поддержка webp внутри css
import autoprefixer from 'gulp-autoprefixer' //автопрефиксер
import groupCssMediaQueries from 'gulp-group-css-media-queries' // групировка медиа запросов

export const js = () => {
	return (
		app.gulp
			.src(app.path.src.js, { sourcemaps: app.isDev })
			//Вывод ошибок
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'JS',
						message: 'Error: <%= error.message %>',
					})
				)
			)
			// сжатый файл в dist
			.pipe(
				webpack({
					mode: app.isBuild ? 'production' : 'development',
					output: {
						filename: 'app.min.js',
					},
					watch: false,
					devtool: 'source-map',
					module: {
						rules: [
							{
								test: /\.m?js$/,
								exclude: /(node_modules|bower_components)/,
								use: {
									loader: 'babel-loader',
									options: {
										presets: [
											[
												'@babel/preset-env',
												{
													debug: true,
													corejs: 3,
													useBuiltIns: 'usage',
												},
											],
										],
									},
								},
							},
						],
					},
				})
			)
			// сжатый файл в dist
			.pipe(app.gulp.dest(app.path.build.js))
			.pipe(app.plugins.browsersync.stream())
	)
}
