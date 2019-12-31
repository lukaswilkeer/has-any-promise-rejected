const { src, dest , series} = require('gulp')
const { exec } = require('child_process')
const babel = require('gulp-babel')

const runCommand = async (command) => {
    await exec(command, {cwd: process.cwd()}, (err, stdout, stderr) => {
        if (err) console.log(err)
        console.log(stdout)
        console.log(stderr)
    })
}

const compileImperative = () => {
  return src('promise-rejection-imperative.js')
    .pipe(babel())
    .pipe(dest('dist/'))
}

const copyFunctional = () => {
  return src('promise-rejection-functional.js')
    .pipe(dest('dist/'))
}

const start = async () => {
    await runCommand('node dist/promise-rejection-imperative.js')
    await runCommand('node dist/promise-rejection-functional.js')
}

exports.default = series(compileImperative, copyFunctional, start)
