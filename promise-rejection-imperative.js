const axios = require('axios')
const assert = require('assert')

let results = []

const urls = [
  'http://localhost:3000/endpointThatWorks',
  'http://localhost:3000/nowhere'
 ]

const generatePromises = (urls) => {
  return urls.map((url) => axios(url).then((result) => result)
    .catch((err) => null))
}

(async (promises) => {
  // here we have the problem of Promise.all rejection
  // const result = Promise.all(arrayOfPromises)
  // so, to resolve this problem of rejections we use fow await.

  for await (const promise of promises) results.push(promise)

  const haveSomePromiseFailed = results.filter(result => result === null).length > 0

  assert(haveSomePromiseFailed, true)
})(generatePromises(urls))
