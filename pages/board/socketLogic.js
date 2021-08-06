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
            activePlayer: null,
            currentCluePoints: 0,
            deny: true,
        }

    }

    componentDidMount() {
        this.addEventListeners();
        if (!this.state.socket) {
            fetch('/api/socketio').finally(() => {
                this.setState({
                    socket: io(),
                })

                this.state.socket.on('custom stuff', () => {
                    console.log("booo")
                })

                this.state.socket.on('a user connected', (sockid) => {
                    console.log(`cell knows ${sockid} connected`)

                })


                this.state.socket.on('connect', () => {
                    this.state.socket.emit('counting')
                })

                this.state.socket.on('update user count', (userCount) => {
                    console.log("updating")
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
                            })
                        }
                    }
                })

                this.state.socket.on('updating buzzed players', (buzzedPlayers) => {
                    this.setState({
                        buzzedPlayers,
                    })
                })

                this.state.socket.on('clue chosen', points => {
                    console.log("new points")
                    this.setState({
                        currentCluePoints: points,
                    })
                })

            })
        }
    }

    addEventListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Control') {
                // do nothing, this is undo
            } else if (e.key === ' ') {
                this.state.socket.emit('player buzzed in', this.state.playerNum)
            } else if (e.key === 'c') {
                this.setState({
                    deny: false,
                })
            }
        })
    }

    render() {
        return (
            <div className={styles.socketcontainer}>
                <span>Users: {this.state.userCount}</span>
                {this.state.deny ? null :
                    <Gstate.Provider value={this.state}>
                        <Board socket={this.state.socket}
                            players={this.state.players} />
                        <PlayersUI />
                    </Gstate.Provider>
                }
            </div>
        )
    }
}
export default SocketLogic;