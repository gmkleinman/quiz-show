const express = require('express')
const next = require('next')
// const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



console.log("doing stuff")

const apiPaths = {
    '/api': {
        target: 'http://localhost:3080',
        pathRewrite: {
            '^/api': '/api'
        },
        changeOrigin: true
    }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

const server = express()
const http = require('http').Server(server);
const io = require('socket.io')(http, {
    transports: ['websocket'],
});
io.on('connection', (socket) => {
    console.log("connected to socket!")
})

app.prepare().then(() => {
    console.log("prepared")

    // if (isDevelopment) {
    //     server.use('/api', createProxyMiddleware(apiPaths['/api']));
    // }

    server.all('*', (req, res) => {
        console.log("handled")
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
}).catch(err => {
    console.log('Error:::::', err)
})