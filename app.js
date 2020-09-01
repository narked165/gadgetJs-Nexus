
//  Require Node Modules
const path = require('path'),
      fs = require('fs'),
      url = require('url'),
    { traceVariable, tracePath, isObjectPrototype } = require(path.join(`${ __dirname }/bin/diag/`))

//  Main Server Object
const Server = {
    events: {},
    mimeTypes: {
        'html': 'text/html',
        'js': 'text/javascript',
        'css': 'text/css',
        'json': 'application/json',
        'ico': 'img/ico',
        'jpg': 'img/jpg',
        'png': 'img/jpg',
        'txt': 'text/plain'
    },
    convertMimeToContentType(mime) {
     return Object.keys( this.mimeTypes ).some(k => k === mime)
            ? this.mimeTypes[mime]
            : this.mimeTypes['html']
    },
    //  Create Event Type, as array if type !Exist & Push Event Key, Callback into attribute value array.
    on(type, Fn) {
        this.events[type]=this.event[type] || []
        this.events[type].push(Fn)
    },
    // If Event key of type map array values and call each; Else throw new Error
    emit(type, data) {
        this.events[type]
            ? this.events[type].map(event => event.apply(this, [data]))
            : console.error(new Error(`<i> TYPE-ERROR Event-Type: ${ type } not reistered.`))
    },
    //  Extract Path object of url and if dir, name, ext exist return conjoined path, else defaut path
    config: {
        Public: {
            SERVER_PORT: 9000,
            SERVER_HOST: '127.0.0.1',
            SERVER_URL: new URL(`http://127.0.0.1:9000/default/index.html`)
        }
    },
    fileRoute(requestUrl) {
        let { dir, name, ext } = path.parse(requestUrl),
        filePath = path.join(`${ __dirname }/doc/${ dir }/${ name }${ ext }`)
        return { filePath, ext }
    },
    // Return state-code 200 if given filepath exists, else return, state code 404
    requestStatus(file) {
       return fs.existsSync(file)
            ? 200
            : 404
    },
    //  Create attribute object payload from request, for required client response in callback.
    router(request, callback) {
        let { filePath, ext } = Server.fileRoute(request.url)
            callback({
                filePath,
                statusCode: this.requestStatus(filePath),
                contentType: this.convertMimeToContentType(ext.replace('.', ''))
            })
    },
    parseRequestBody(request, callback) {
        Server.on('Post-Body-Parsed', body => callback(chunk))
        let chunks = ""
        request.on('data', chunks => chunks += chunk)
        request.on('end', () => Server.emit('Post-Body-Parsed', JSON.parse(chunk)))
    },
    respondWith: {
        desktop(response) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            })
            fs.createReadStream(path.join(`${ __dirname }/doc/desktop/index.html`)).pipe(response)
        },
        error404(response, _path) {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            })
            response.write(`<h1>${ _path }</h1>`)
            fs.createReadStream(path.join(`${ __dirname }/doc/error/error404/index.html`)).pipe(response)
        },
        debugSource(response, options) {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            })
            for(let d in options) {
                response.write(`<h1> * ${ d } : ${ options[d] }</h1><br />`)
            }


            fs.createReadStream(path.join(`${ __dirname }/doc/dev/debug/source.html`)).pipe(response)

        },
        tracePath(response, options) {
            this.respondWith.debugSource(response, {
                "Params":JSON.stringify(params),
                "Request-URL": request.url,
                "paramsName": uriMap.name,
                "paramsExt": uriMap.ext,
                "Path-Exists": fs.existsSync(path.join(`${ __dirname }/doc/${request.url}`))
            })
        }

    }
}
//  Functional component from nodeJs || Create-HTTP-Server.
const httpServer = require('http').createServer()

    // Component Event: When Server instantiates as listener, stdout a message for debug.
    httpServer.on('listening', () => console.info(`<i>  Server listening on resource location: ${ Server.config.Public.SERVER_PORT }..`))

    //  Component Event: When Server errors handle by throwing a New stderr instance.
    httpServer.on('error', (e) => console.error(`<!>  System Error:  ${ e }`))

    httpServer.on('connection', c => console.info(`<i>  [DEBUG] New connection from ${ c.localAddress }`))

    //  Component Event: When new client request, send request & callback to router
    httpServer.on('request', (request, response) => {
        //  On POST Request parse the body for the POST message or parse url for queryString params
        let uriMap =  path.parse(request.url)
            params = url.parse(request.url, true)

        request.method.toUpperCase === "POST"
            ? Server.parseRequestBody(request, (body) => body)
            : request.url === "/" || !uriMap.ext

                ? Server.respondWith.desktop(response)
                : uriMap.name === null || !uriMap.ext === null

                  ? Server.respondWith.desktop(response)
                    // Use attributes to respond with the requested route or error route based on statusCodServer.
                  : Server.router(request, ({ filePath, contentType, statusCode }) => {
                        response.writeHead(statusCode, {
                        'Content-Type': contentType
                        })
                        statusCode === 200
                            ? fs.createReadStream(filePath).pipe(response)
                            : Server.respondWith.error404(response)
                     })

    })
// Instatiate Server on Listening Port and Host
httpServer.listen(Server.config.Public.SERVER_PORT, Server.config.Public.SERVER_HOST)