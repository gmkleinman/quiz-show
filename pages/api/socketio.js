import { Server } from 'socket.io'

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server)

        io.emit('update user count', io.engine.clientsCount);

        io.on('connection', socket => {
            socket.broadcast.emit('a user connected')
            socket.broadcast.emit('update user count', io.engine.clientsCount)

            socket.on('custom thing', () => {
                console.log("custom")
            })

            socket.on('disconnect', () => {
                console.log("disconnected")
                io.emit('update user count', io.engine.clientsCount);
            })

            socket.on('counting', () => {
                io.emit('update user count', io.engine.clientsCount);
                console.log("counting")
            })
        })

        res.socket.server.io = io
    } else {
        console.log('socket.io already running')
    }
    res.end()
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler