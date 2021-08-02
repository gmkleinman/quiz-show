import React, { useEffect } from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'
import Board from './board'

class SocketLogic extends React.Component {
    constructor(props) {
        super(props)
        this.connected = false;
        this.state = {
            userCount: 0,
        }
    }
    componentDidMount() {
        if (!this.connected) {
            fetch('/api/socketio').finally(() => {
                const socket = io()

                socket.on('connect', () => {
                    socket.emit('counting')
                })

                socket.on('a user connected', () => {
                    console.log("a user connected")
                })

                socket.on('update user count', (userCount) => {
                    this.setState({
                        userCount,
                    })
                })
            })
        }
    }

    render() {
        return (
            <div>
                <span>Users: {this.state.userCount}</span>
                <Board />
            </div>
        )
    }
}

export default SocketLogic;