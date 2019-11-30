const { src, dest , series} = require('gulp')
const { exec } = require('child_process')
const babel = require('gulp-babel')

const compile = () => {
    const compileImperative = src('promise-rejection-imperative.js')
    	.pipe(babel)
        .pipe(dest('dist/'))

    const copyFunctional = () => src('promise-rejection-functional.js')
    	.pipe(dest('dist/'))
}

const start = async () => {
	await exec('node dist/promise-rejection-imperative.js', {
		cwd: process.cwd()
	})

	await exec('node dist/promise-rejection-functionla.js', {
		cwd: process.cwd()
	})
}

export.default = series(compile, start)