const handlers = require('./handlers')

const router = (request,response) => {
const endpoint = request.url

  if (endpoint === '/') {
    handlers.handleHome(request,response)
  } else if (endpoint.startsWith('/public')) {
    handlers.handlePublic(request,response)
  } else if (endpoint === ('/create-char')) {
    handlers.handleCreateChar(request,response)
  } else if (endpoint.startsWith('/get-char')) {
    handlers.handleGetChar(request,response,endpoint)
  } else if (endpoint.startsWith('/get-all-char')) {
    handlers.handleGetAllChar(request,response)
  } else {
    handlers.handle404(request,response)
  }
}

module.exports = router
