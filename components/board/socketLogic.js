import io from 'socket.io-client'
import React from 'react'
import styles from '../../styles/board.module.css'
import Game from './game'
import Link from 'next/link'

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
            clueList: {},
            host: this.props.host,
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

                this.state.socket.on('io updating points', () => {
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

                this.state.socket.on('io changing round', (round) => {
                    this.setState({
                        round,
                    })
                })

                this.state.socket.on('io loading clues', (clueList) => {
                    this.setState({
                        clueList,
                    })
                })

            })
        }

        window.addEventListener('keydown', (e) => {
            // TODO: this runs every render; prefer only runs once
            if (!this.state.denyEntry) {
                if (e.key === ' ') {
                    // buzz in
                    if (this.state.allowBuzzins) {
                        this.state.socket.emit('player buzzed in', this.state.playerNum)
                    }

                    if (this.state.host === true) {
                        if (e.key === 'Control') {
                            this.setState({
                                undo: true,
                            })
                        } else if (e.key === 'n') {
                            this.state.socket.emit('allow buzz ins')
                        } else if (e.key === 'm') {
                            this.state.socket.emit('select buzz in')
                        } else if (e.key === 'y') {
                            this.state.socket.emit('start host countdown')
                        } else if (e.key === ',') {
                            this.state.socket.emit('clue answered', false)
                        } else if (e.key === '.') {
                            this.state.socket.emit('clue answered', true)
                        }
                    }
                }
            }
        })

        window.addEventListener('touchstart', () => {
            if (this.state.allowBuzzins) {
                this.state.socket.emit('player buzzed in', this.state.playerNum)
            }
        })

        window.addEventListener('keyup', (e) => {
            this.setState({
                undo: false,
            })
        })

        window.addEventListener("focus", () => {
            this.state.socket.emit('window focus change', this.state.playerNum, true)
        })
    
        window.addEventListener("blur", () => {
            this.state.socket.emit('window focus change', this.state.playerNum, false)
        })
    }

    setPlayerName(e) {
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
                <Gstate.Provider value={this.state}>
                    {this.state.denyEntry
                        ?
                        <div className={styles.usercount}>
                            <div className={styles.entrycontainer}>
                                <div>
                                    Display Name
                                </div>
                                <div>
                                    <input value={this.state.playerName}
                                        onChange={(e) => { this.setPlayerName(e) }} />
                                </div>
                                <div>
                                    <button onClick={() => this.enterGame()}>
                                        Enter
                                    </button>
                                </div>
                                <div>
                                    <Link href="/api/logout">Logout</Link>
                                </div>
                            </div>
                        </div>
                        :
                        <Game />
                    }
                </Gstate.Provider>
            </div>
        )
    }
}
export default SocketLogic;