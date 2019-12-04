const getData = require('./queries/getData')
const postData = require('./queries/postData')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')
const path = require('path')

const handleHome = (request,response) => {
  const filePath = path.join(__dirname,'../public/index.html')
  fs.readFile(filePath, (err,file) => {
    if (err) {
      console.log(err)
      response.writeHead(500, { 'content-type' : 'text/html' })
      response.end('<h1>Sorry, a problem on our end!</h1>')
    } else {
      response.writeHead(200, { 'content-type' : 'text/html' })
      response.end(file)
    }
  })
}

// const handlePublic = (request,response) => {
// // const extension = request.url.split('.')[1]
// const extension = path.extname(request.url)
//
//   const filePath = path.join(__dirname, '..', request.url)
// }

module.exports = {
  handleHome,
}
