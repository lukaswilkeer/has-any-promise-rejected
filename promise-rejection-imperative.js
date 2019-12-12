yconst axios = require('axios')
const assert = require('assert')

let results = []

const urls = [
  'http://localhost:3000/endpointThatWorks',
  'http://localhost:3000/nowhere'
 ]

const generatePromises = (url) => {
  return axios(url).catch(null)
}

const promises = urls.map(generatePromises)

const mapPromises = async (promises, index = 0) => {
	let result;

	try {
	  result = await promises[index].catch((err) => null)
	} catch (err) {
		 reuslt = err
	}

 	results.push(result)

	return index < promises.length - 1
		? mapPromises(promises, ++index)
		: results
}

(async (arrayOfPromises) => {
  // here we have the problem of Promise.all rejection
  // const result = Promise.all(arrayOfPromises)
  // so, to resolve this problem of rejections we use fow await with babel,
  // but there's a problem. for await transform the code to async generetors
  // but you cannot yield inside a promise or yield a promise inside a generator, causing a parse error.
  // on other hand, you can implement the generator by itself, but the root cause is the same.

  const resolvedPromises = await mapPromises(arrayOfPromises)
  const haveSomePromiseFailed = resolvedPromises.filter(result => result === null).length > 0

  assert(haveSomePromiseFailed, true)
})(promises)
