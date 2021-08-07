import { Server } from 'socket.io'

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server)

        io.emit('update user count', io.engine.clientsCount);

        let players = [];
        let buzzedPlayers = [];
        let currentCluePoints = 0;
        let activePlayer = null;



        io.on('connection', socket => {
            //broadcast sends to all OTHER clients
            //io.emit sends to ALL clients
            //DON'T USE SOCKET.EMIT


            players.push(socket.id);
            io.emit('update user count', io.engine.clientsCount)
            io.emit('update players', players);
            // io.emit('a user connected', socket.id)

            socket.on('counting', () => {
                io.emit('update user count', io.engine.clientsCount);
            })

            socket.on('disconnect', () => {
                let i = players.indexOf(socket.id);
                if (i > -1) {
                    // this doesn't really do enough I don't think
                    players[i] = null;
                    io.emit('update players', players)
                }
                console.log("disconnected")
                io.emit('update user count', io.engine.clientsCount);
            })



            // CLUE LOGIC

            // keeping track of clues will help deal with disconnect glitches
            // let shownClues = Array(30).fill(false)
            socket.on('clue clicked', (id, points) => {
                io.emit('send clue to clients', id)
                currentCluePoints = points;
            })


            // BUZZER LOGIC
            socket.on('player buzzed in', (player) => {
                if (!buzzedPlayers.includes(player)) {
                    buzzedPlayers.push(player)
                }
                io.emit('updating buzzed players', buzzedPlayers);
            })

            // when io gets "pick buzzin", it selects at random and emits that player
            socket.on('select buzz in', () => {
                console.log(buzzedPlayers)
                let randomPlayer = buzzedPlayers[Math.floor(Math.random() * buzzedPlayers.length)];
                io.emit('active player selected', randomPlayer)
                activePlayer = randomPlayer;
                buzzedPlayers = [];
                console.log(randomPlayer)
            })

            // when io gets wrong answer, emit score change for player and allow ringins
            // when io gets right answer, emit score change for player and block ringins


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