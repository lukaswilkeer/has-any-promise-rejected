const axios = require('axios')
const assert = require('assert')

const urls = [
  'http://localhost:3000/endpointThatWorks',
  'http://localhost:3000/nowhere'
 ]

const generatePromises = (url) => {
  return axios(url).catch((err) => new Error(err))
}

const promises = urls.map(generatePromises)

const getResult = (result) => {
  // do some task
  return typeof(result) === Error 
    ? result
    : null
}

const mapPromises = async (promises, index = 0, result = []) => {
  // scoped variable result for better manangement.
  console.log('index', index)
  console.log('promises length', promises.length)
  try {
    // you can't throw an error inside a try/catch block on recursions cause
    // its a break statement like c.

    const pResult = await promises[index].then(getResult)
      .catch((err) => {
        throw new Error(err)
      })

    console.log('pResult', pResult)

    result.push(pResult)
    console.log('result', result)
    return result
  } catch(err) {
    console.error(err) // or other log library
    console.log('catch result', result)
    result.push(null)
    return result
  }

  return index < promises.length
     ? mapPromises(promises, ++index, result)
     : result
}

(async (arrayOfPromises) => {
  // here we have the problem of Promise.all rejection
  // const result = Promise.all(arrayOfPromises)
  // so, to resolve this problem of rejections we use a fuckin recursion!

  // optional index, I prefer not.
  const results = await mapPromises(arrayOfPromises)
  console.log('results', results)

  // haveSomePromiseFailed is a Boolean
  // I doesn't recoment to attach .length aftler a filter due to semantics
  // declaring some variable to do this is the best
  const haveSomePromiseFailed = results.filter(value => value == null).length > 0

  // why .catch(null)? Throwing a error means that we need 
  // to handle it using try/catch. On that case I prefer to not.
  assert(haveSomePromiseFailed, true)
})(promises)
