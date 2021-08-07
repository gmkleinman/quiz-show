import io from 'socket.io-client'
import Board from './board'
import React from 'react'
import PlayersUI from '../playerui/players_ui'
import styles from '../../styles/board.module.css'

export const Gstate = React.createContext();

class SocketLogic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userCount: 0,
            players: [],
            socket: null,
            playerNum: null,
            buzzedPlayers: null,
            allowBuzzins: false,
            activePlayer: null,
            denyEntry: true,
            playerName: 'Nom de Plume',
            playerNames: [],
            playerSitting: false,
            round: 1,
        }
    }

    componentDidMount() {
        if (!this.state.socket) {
            fetch('/api/socketio').finally(() => {
                this.setState({
                    socket: io(),
                })

                this.state.socket.on('connect', () => {
                    this.state.socket.emit('counting')
                })

                this.state.socket.emit('player enters room')

                this.state.socket.on('update user count', (userCount) => {
                    this.setState({
                        userCount,
                    })
                })

                this.state.socket.on('update players', players => {
                    this.setState({
                        players,
                    })

                    for (let i = 0; i < 4; i++) {
                        if (players[i] === this.state.socket.id) {
                            this.setState({
                                playerNum: i,
                                playerSitting: true,
                            })
                        }
                    }
                })

                this.state.socket.on('updating buzzed players', (buzzedPlayers) => {
                    this.setState({
                        buzzedPlayers,
                    })
                })

                this.state.socket.on('active player selected', (activePlayer) => {
                    console.log(activePlayer)
                    this.setState({
                        activePlayer,
                        buzzedPlayers: [],
                        allowBuzzins: false,
                    })
                })

                this.state.socket.on('io allowing buzz ins', () => {
                    this.setState({
                        allowBuzzins: true,
                    })
                })

                this.state.socket.on('io updating points', (playerPoints) => {
                    this.setState({
                        activePlayer: null,
                    })
                })

                this.state.socket.on('io disable buzz ins', () => {
                    this.setState({
                        allowBuzzins: false,
                    })
                })

                this.state.socket.on('update names', (playerNames) => {
                    this.setState({
                        playerNames,
                    })
                })

                this.state.socket.on('io changing round', () => {
                    let newRound;
                    this.state.round === 1 ? newRound = 2 : newRound = 1;
                    this.setState({
                        round: newRound,
                    })
                })
            })
        }

        window.addEventListener('keydown', (e) => {
            // TODO: this runs every render; prefer only runs once
            if (!this.state.denyEntry) {
                if (e.key === 'Control') {
                    this.setState({
                        undo: true,
                    })
                } else if (e.key === ' ') {
                    // buzz in
                    if (this.state.allowBuzzins) {
                        this.state.socket.emit('player buzzed in', this.state.playerNum)
                    }
                    // BEFOREPRODUCTION: MAKE IT SO ONLY PLAYER NUM 3 CAN DO THIS - HOST
                } else if (e.key === 'n') {
                    this.state.socket.emit('allow buzz ins')
                } else if (e.key === 'm') {
                    this.state.socket.emit('select buzz in')
                } else if (e.key === ',' || e.key === '.') {
                    this.state.socket.emit('clue answered', e.key)
                } else if (e.key === 'r') {
                    this.state.socket.emit('round change')
                }
            }
        })

        window.addEventListener('keyup', (e) => {
            this.setState({
                undo: false,
            })
        })
    }

    setPlayerName(e) {
        console.log(e.target.value)
        this.setState({
            playerName: e.target.value
        })
    }

    enterGame() {
        this.state.socket.emit('player enters game', this.state.playerName, this.state.playerNum)
        this.setState({
            denyEntry: false,
        })
    }

    render() {
        return (
            <div className={styles.socketcontainer}>
                {this.state.denyEntry
                    ? <div className={styles.usercount}>
                        <div>
                            Users: {this.state.userCount}
                        </div>
                        <div>
                            Enter Name: <input value={this.state.playerName}
                                onChange={(e) => { this.setPlayerName(e) }} />
                            <button onClick={() => this.enterGame()}>
                                Click to Enter
                            </button>
                        </div>
                    </div>
                    :
                    <Gstate.Provider value={this.state}>
                        <Board />
                        <PlayersUI />
                    </Gstate.Provider>
                }
            </div>
        )
    }
}
export default SocketLogic;