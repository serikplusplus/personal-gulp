import { configFTP } from '../config/ftp.js'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util' //правильное подключение компонентов @@include

export const ftp = () => {
	configFTP.log = util.log
	const ftpConnect = vinylFTP.create(configFTP)
	return app.gulp
		.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'FTP',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(ftpConnect.dest(`/${configFTP.folder}`)) //   /${app.path.rootFolder} - Добавив это в путь app.path.ftp добавится папка с названием проекта
}
