import NewWindow from 'react-new-window'
import HostUI from '../nongame/hostui'
import PlayersUI from '../playerui/players_ui'
import Board from './board'
import styles from '../../styles/board.module.css'
import React, { useEffect, useState } from 'react'
import { Gstate } from './socketLogic'
import FinalRound from './finalround'

const Game = () => {
    let { socket } = React.useContext(Gstate)
    const [finalRound, setFinalRound] = useState(false);

    useEffect(() => {
        socket.on('io final round', () => {
            setFinalRound(true);
        })

        socket.on('io not final round', () => {
            setFinalRound(false);
        })

    }, [socket])

    return (
        <div className={styles.gamecontainer}>
            <NewWindow
                title={'Host UI'}
                features={{ height: 750, width: 650 }}
            >
                <HostUI />
            </NewWindow>
            {finalRound ?
                <FinalRound />
                :
                <Board />
            }
            <PlayersUI />
        </div>
    )
}

export default Game