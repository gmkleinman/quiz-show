import { Server } from 'socket.io'

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server)

        io.emit('update user count', io.engine.clientsCount);

        let players = [];
        let buzzedPlayers = [];

        io.on('connection', socket => {
            socket.emit('a user connected')
            socket.emit('update user count', io.engine.clientsCount)

            //broadcast sends to all OTHER clients
            //emit sends to ALL clients

            console.log("players:")
            console.log(players)
            players.push(socket.id);

            socket.emit('update players', players);

            socket.on('custom thing', () => {
                console.log("custom")
            })

            socket.on('disconnect', () => {
                let i = players.indexOf(socket.id);
                if (i > -1) {
                    // this doesn't really do enough I don't think
                    players[i] = null;
                    socket.emit('update players', players)
                }

                console.log("disconnected")
                io.emit('update user count', io.engine.clientsCount);
            })

            socket.on('counting', () => {
                io.emit('update user count', io.engine.clientsCount);
            })

            socket.on('player buzzed in', (player) => {
                if (!buzzedPlayers.includes(player)) {
                    buzzedPlayers.push(player)
                }
                io.emit('updating buzzed players', buzzedPlayers);
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