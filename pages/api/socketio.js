import { Server } from 'socket.io'

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server)

        io.emit('update user count', io.engine.clientsCount);

        //at some point change players to an object, these arrays are ridic

        let players = [null, null, null, null]; // for socket ids
        let buzzedPlayers = [];
        let currentCluePoints = 0;
        let activePlayer = null;
        let playerPoints = [0, 0, 0];
        let allowedBuzzin = [true, true, true];
        let playerNames = ['(P1)', '(P2)', '(P3)', '(Host)']
        let shownClues = {};
        let clueList = {};

        io.on('connection', socket => {
            //broadcast sends to all OTHER clients
            //io.emit sends to ALL clients
            //DON'T USE SOCKET.EMIT ON THE BACK END


            // players.push(socket.id);
            io.emit('update user count', io.engine.clientsCount)
            // io.emit('update players', players);
            // io.emit('a user connected', socket.id)

            socket.on('counting', () => {
                io.emit('update user count', io.engine.clientsCount);
            })

            socket.on('disconnect', () => {
                let i = players.indexOf(socket.id);
                if (i > -1) {
                    players[i] = null;
                    playerNames[i] = '(DC)'
                    io.emit('update names', playerNames)
                    io.emit('update players', players)
                }
                console.log("disconnected")
                io.emit('update user count', io.engine.clientsCount);
            })


            // PLAYER ENTRY

            socket.on('player enters room', () => {
                io.emit('update names', playerNames)
                io.emit('update players', players);
                io.emit('io updating points', playerPoints) //this doesn't work
                io.emit('io loading clues', clueList)
            })

            socket.on('player sits down', (playerName, slotNum, id) => {
                console.log("sitting; name, slotnum, id")
                console.log(playerName)
                console.log(slotNum)
                console.log(id)
                playerNames[slotNum] = playerName;
                players[slotNum] = id;
                io.emit('update names', playerNames)
                io.emit('update players', players);
                io.emit('io updating points', playerPoints)
            })


            // LOADING CLUES

            socket.on('load clues', newClueList => {
                io.emit('io loading clues', newClueList)
                clueList = newClueList;
            })


            // CLUE LOGIC

            // keeping track of clues will help deal with disconnect glitches
            socket.on('clue clicked', (id, points, shown) => {
                io.emit('send clue to clients', id, shown)
                io.emit('io allowing buzz ins')
                shownClues[id] = true;
                currentCluePoints = points;
                allowedBuzzin = [true, true, true]
            })

            socket.on("clue reset", (id) => {
                io.emit("io sends clue reset", id);
            })

            socket.on('get initial clue status', () => {
                console.log("'get initial clue status")
                console.log(clueList)
                // send only to the client that just connected
                socket.emit('io sends clue status', shownClues)
                socket.emit('io loading clues', clueList)
            })

            socket.on('start host countdown', () => {
                console.log("starting host countdown")
                io.emit('io starts host countdown')
            })


            // BUZZER LOGIC
            socket.on('allow buzz ins', () => {
                console.log("allowing buzz ins")
                io.emit('io allowing buzz ins')
                allowedBuzzin = [true, true, true]
            })

            socket.on('disable buzz ins', () => {
                console.log("disabled buzz ins")
                io.emit('io disable buzz ins')
            })

            socket.on('player buzzed in', (playerNum) => {
                if (!buzzedPlayers.includes(playerNum) && allowedBuzzin[playerNum]) {
                    buzzedPlayers.push(playerNum)
                }
                io.emit('updating buzzed players', buzzedPlayers);
            })

            socket.on('select buzz in', () => {
                let randomPlayer = buzzedPlayers[Math.floor(Math.random() * buzzedPlayers.length)];
                io.emit('active player selected', randomPlayer)
                activePlayer = randomPlayer;
                buzzedPlayers = [];
            })

            socket.on('clue answered', (correct) => {
                if (correct) {
                    playerPoints[activePlayer] += currentCluePoints
                } else {
                    playerPoints[activePlayer] -= currentCluePoints
                    io.emit('io allowing buzz ins')
                    allowedBuzzin[activePlayer] = false;
                }
                io.emit('io updating points', playerPoints)
                activePlayer = null;
                console.log("clue answered")
            })


            // CHANGE ROUND
            socket.on('round change', () => {
                shownClues = {};
                io.emit('io changing round')
                console.log("io changing round")
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