import NewWindow from 'react-new-window'
import HostUI from '../nongame/hostui'
import PlayersUI from '../playerui/players_ui'
import Board from './board'
import styles from '../../styles/board.module.css'
import React, { useEffect, useState } from 'react'
import { Gstate } from './socketLogic'
import FinalRound from './finalround'

const Game = () => {
    let { socket, host } = React.useContext(Gstate) || {}
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
            {host ?
                <NewWindow
                    title={'Host UI'}
                    features={{ height: 775, width: 1050 }}
                >
                    <HostUI />
                </NewWindow>
                : null
            }
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