import io from 'socket.io-client'
import Board from './board'
import React from 'react'
import PlayersUI from '../playerui/players_ui'
import styles from '../../styles/board.module.css'

export const Gstate = React.createContext();

class SocketLogic extends React.Component {
    constructor(props) {
        super(props)
        this.connected = false;
        this.state = {
            userCount: 0,
            players: [],
            socket: null,
            playerNum: null,
            buzzedPlayers: null,
            activePlayer: null,
        }

    }

    componentDidMount() {
        this.addEventListeners();
        if (!this.connected) {
            fetch('/api/socketio').finally(() => {
                this.setState({
                    socket: io(),
                })

                this.state.socket.on('connect', () => {
                    this.state.socket.emit('counting')
                })

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
                            })
                        }
                    }
                })

                this.state.socket.on('updating buzzed players', (buzzedPlayers) => {
                    this.setState({
                        buzzedPlayers,
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
            }
        })
    }

    render() {
        return (
            <div className={styles.socketcontainer}>
                <Gstate.Provider value={this.state}>
                    {/* <span>Users: {this.state.userCount}</span> */}
                    <Board socket={this.state.socket}
                        players={this.state.players} />
                    <PlayersUI />
                </Gstate.Provider>
            </div>
        )
    }
}
export default SocketLogic;