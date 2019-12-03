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

const handleError = (value) => {
  return value instanceof Error
    ? null
    : value
}

const getResult = (result) => {
  // do some task
  return !(result instanceof Error) 
    ? result
    : null
}

const mapPromises = async (promises, index = 0, result = []) => {
  const pResult = await promises[index].catch((err) => new Error(err))

  result.push(pResult)

  return index < promises.length - 1
     ? mapPromises(promises, ++index, result)
     : result
}

(async (arrayOfPromises) => {
  // here we have the problem of Promise.all rejection
  // const result = Promise.all(arrayOfPromises)
  // so, to solve the problem of rejections we use a fuckin recursion!
  // don't know how to handle mapPromise catch error propertly, cause it's
  // need to return and array with `null` and create a function to do it seems strange
  // to me, setting it aparentely is the best shot.

  // optional index
  const results = await mapPromises(arrayOfPromises).catch((err) => [null])

  const resolvedPromises = results.map(handleError) 
  const haveSomePromiseFailed = resolvedPromises.filter(value => value === null).length > 0

  assert(haveSomePromiseFailed, true)
})(promises)