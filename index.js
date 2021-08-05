const express = require('express')
const next = require('next')
const open = require('open')
// const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

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
app.prepare().then(() => {

    // if (isDevelopment) {
    //     server.use('/api', createProxyMiddleware(apiPaths['/api']));
    // }

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        open('http://localhost:8080');
        console.log(`> Ready on http://localhost:${port}`)
    })
}).catch(err => {
    console.log('Error:::::', err)
})