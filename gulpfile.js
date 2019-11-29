const { src, dest , series} = require('gulp')
const { exec } = require('child_process')

const compile = async () => {
    const compileImperative = src('promise-rejection-imperative.js')
          .pipe(dest('dist/'))

    const copyFunctional = async () = {
    	await exec('cp promise-rejection-functional.js dest/')
    }
}

const start = async () => {
	await exec('node dist/promise-rejection-imperative.js')
	await exec('node dist/promise-rejection-functionla.js')
}

export.default = series(compile, start)