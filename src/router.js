const handlers = require('./handlers')

const router = (request,response) => {
const endpoint = request.url

  if (endpoint === '/') {
    handlers.handleHome(request,response)
  } else if (endpoint.startsWith('/public')) {
    handers.handlePublic(request,response)
  } else if (endpoint === ('/create-char')) {
    handlers.handlePostData(request,response)
  } else if (endpoint.startsWith('/search')) {
    handlers.handleSearch(request,response)
  } else {
    handle404(request,response)
  }
}

module.exports = router
