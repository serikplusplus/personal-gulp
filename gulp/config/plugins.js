import replace from 'gulp-replace' // Поиск и замена //замена частей в файле
import plumber from 'gulp-plumber' // Обработка ошибок
import notify from 'gulp-notify' // Сообщения (подсказки)
import browsersync from 'browser-sync'
import newer from 'gulp-newer' //Проверка обновления
import ifPlugin from 'gulp-if' //Условные операции gulp

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}
