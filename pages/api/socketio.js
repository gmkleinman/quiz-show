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
        let playerNames = ['(P1)', '(P2)', '(P3)', '(Host)'];
        let shownClues = {};
        let clueList = {};
        let clueCount = 0;
        let round = 1;
        let bonusStep = 0;
        let bonusClues = {};
        let playerInputs = {
            wagers: ['-', '-', '-'],
            answers: ['-', '-', '-'],
        }

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

            socket.on('kick player', (playerNum) => {
                let kickedID = players[playerNum]
                io.sockets.sockets.forEach((iosocket) => {
                    if (iosocket.id === kickedID)
                        iosocket.disconnect(true);
                });
            })


            // PLAYER ENTRY

            socket.on('player enters room', () => {
                io.emit('update names', playerNames)
                io.emit('update players', players);
                io.emit('io updating points', playerPoints) //this doesn't work
                io.emit('io loading clues', clueList)
                io.emit('io changing round', round)
            })

            socket.on('player sits down', (playerName, slotNum, id) => {
                console.log("sitting")
                playerNames[slotNum] = playerName;
                players[slotNum] = id;
                io.emit('update names', playerNames)
                io.emit('update players', players);
                io.emit('io updating points', playerPoints)
                io.emit('io changing round', round)
            })


            // LOADING CLUES

            socket.on('load clues', (newClueList, clueArray) => {
                try {
                    console.log("loading clues")
                    clueList = newClueList;
                    clueCount = 0;
                    clueArray.forEach(clue => {
                        if (clue != '') clueCount++;
                    });

                    io.emit('io update clue count', clueCount)
                    setBonusClues();
                    console.log('bonus clues:')
                    console.log(bonusClues)
                    io.emit('io loading clues', clueList)
                }
                catch {
                    console.log('failed to load clue list')
                }
            })

            const setBonusClues = () => {
                // randomize from all categories but only bottom 3 rows
                // first round, one bonus
                let col = Math.floor(Math.random() * 6) + 1; //1 thru 6
                let row = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
                let tag = col.toString() + row.toString();
                bonusClues[tag] = clueList[col][row];
                clueList[col][row] = 'bonus clue!';

                // second round, two bonuses from different columns
                let firstCol = 0;
                let i = 0;
                while (i < 2) {
                    col = Math.floor(Math.random() * 6) + 7; // 7 thru 12
                    row = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
                    tag = col.toString() + row.toString();

                    if (i === 0) {
                        firstCol = col;
                    }

                    if (firstCol != col || i === 0) {
                        bonusClues[tag] = clueList[col][row];
                        clueList[col][row] = 'bonus clue!';
                        i++;
                    }
                }
            }


            // CLUE LOGIC

            // keeping track of clues will help deal with disconnect glitches
            // really though, this row/col thing is terrible and should be refactored
            // length of 15 means two-digit columns
            socket.on('clue clicked', (id, points, shown) => {
                //check for bonus clue
                let col, row;
                if (id.length === 15) {
                    col = parseInt(id[7] + id[8]) + 1;
                    row = parseInt(id[14]) + 1;
                } else {
                    col = parseInt(id[7]) + 1;
                    row = parseInt(id[13]) + 1;
                }

                let tag = col.toString() + row.toString();
                let bonusClue = bonusClues[tag];
                if (bonusClue) {
                    if (bonusStep === 0) {
                        io.emit('send clue to clients', id, shown, true)
                    } else if (bonusStep === 1) {
                        if (id.length === 14) {
                            clueList[col][row] = bonusClue
                        } else {
                            clueList[col][row] = bonusClue
                        }
                        io.emit('io loading clues', clueList)
                    } else if (bonusStep === 2) {
                        io.emit('send clue to clients', id, shown)
                        shownClues[id] = true;
                        // clearCategory(id)
                        for (let i = 0; i < 14; i++) {
                            clearCategory(i)
                        }
                    }
                    bonusStep = (bonusStep + 1) % 3
                } else {
                    io.emit('send clue to clients', id, shown)
                    io.emit('io allowing buzz ins')
                    shownClues[id] = true;
                    currentCluePoints = points;
                    allowedBuzzin = [true, true, true]
                    clearCategory(col)
                }
            })

            const clearCategory = (col, id) => {
                // more dumb stuff I have to deal with because of dumb stuff I did
                let seenCol;
                let seenClues = Object.keys(shownClues);
                let count = 0;
                seenClues.forEach(seenClue => {
                    if (seenClue.length === 15) {
                        seenCol = parseInt(seenClue[7] + seenClue[8]) + 1;
                    } else {
                        seenCol = parseInt(seenClue[7]) + 1;
                    }

                    if (seenCol === col) {
                        count++;
                    }
                });
                if (count >= 5) io.emit('io sends clear category', (col % 6) - 1)
            }

            socket.on("clue reset", (id) => {
                io.emit("io sends clue reset", id);
            })

            socket.on('get initial clue status', () => {
                // send only to the client that just connected
                socket.emit('io sends clue status', shownClues)
                socket.emit('io loading clues', clueList)
            })

            socket.on('start host countdown', () => {
                console.log("starting host countdown")
                io.emit('io starts host countdown')
            })

            socket.on("start bonus countdown", () => {
                console.log("starting bonus countdown")
                io.emit('io starts bonus countdown')
            })


            // BUZZER LOGIC
            socket.on('allow buzz ins', () => {
                console.log("allowing buzz ins")
                io.emit('io allowing buzz ins')
                allowedBuzzin = [true, true, true]
            })

            socket.on('disable buzz ins', () => {
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
                if (round === 1) {
                    round = 2;
                } else {
                    round = 1;
                }
                io.emit('io changing round', round)
                console.log("io changing round")
            })

            socket.on('final round', () => {
                let finalCategory = clueList['13'][0];
                io.emit('io final round', finalCategory);
            })

            // HOST OVERRIDES
            socket.on('set score override', (playerNum, score) => {
                console.log("overriding score")
                playerPoints[playerNum] = score;
                io.emit('io updating points', playerPoints);
            })

            socket.on('add bonus clue points', (playerNum, score) => {
                playerPoints[playerNum] += score;
                io.emit('io updating points', playerPoints);
            })

            socket.on('reset game', () => {
                console.log("resetting game")
                playerPoints = [0, 0, 0]
                shownClues = {};
                clueList = {};
                clueCount = 0;
                round = 1;
                bonusClues = {};
                bonusStep = 0;
                
                io.emit('io not final round')
                io.emit('io updating points', playerPoints);
                io.emit('io sends clue status', shownClues)
                io.emit('io loading clues', clueList)
                io.emit('io update clue count', clueCount)
                io.emit('io changing round', round)
            })

            let focusLog = {};
            socket.on('window focus change', (playerNum, playerFocus) => {
                // focusChange(playerNum, playerFocus);
                // let date = new Date();
                // time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
                // if (!focusLog[playerNum]) {
                //     focusLog[playerNum] = [];
                // }
                // focusLog[playerNum].push(time);
                // io.emit('update window focus', focusLog, playerNum, playerFocus);

                //TODO: make focusChange function
                // work this out
            })

            
            // FINAL CLUE

            socket.on('reveal final clue', () => {
                console.log("reveal final clue")
                let finalClue = clueList['13'][1];
                io.emit('io reveals final clue', finalClue)
            })

            socket.on('begin final timer', () => {
                console.log("begin final timer")
                io.emit('io begins final timer')
                setTimeout(() => {
                    io.emit('io ends final timer')
                    io.emit('io sends final responses', (playerInputs))
                    console.log("end timer and send responses")
                }, 30000)
            })

            socket.on('player input changed', (type, input, playerNum) => {
                console.log("input changed");
                playerInputs[type][playerNum] = input
                io.emit('io sends player inputs', (playerInputs))
            })

            socket.on('reveal final response', (resType, i) => {
                console.log("revaling final response")
                io.emit('io reveals final response', resType, i)
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