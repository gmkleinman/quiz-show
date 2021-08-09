import ClueLoader from "./clueloader";
import React, { useEffect } from 'react'
import styles from '../../styles/hostui.module.css'
import { Gstate } from '../board/socketLogic';

const HostUI = (props) => {
    let { socket } = React.useContext(Gstate);
    const correct = () => {
        socket.emit('clue answered', true)
    }

    const incorrect = () => {
        socket.emit('clue answered', false)
    }

    const nextRound = () => {
        // TODO: MAKE THIS HARDER TO DO BY ACCIDENT
        socket.emit('round change')
    }

    const countdown = () => {
        socket.emit('start host countdown')
    }

    const selectPlayer = () => {
        socket.emit('select buzz in')
    }

    const allowBuzz = () => {
        socket.emit('allow buzz ins')
    }

    return (
        <div>
            <ClueLoader />
            <div className={styles.answers}>
                <button className={styles.correct} onClick={correct}>
                    ✓
                </button>
                <button className={styles.incorrect} onClick={incorrect}>
                    ❌
                </button>
            </div>
            <div className={styles.cluecontrols}>
                <button onClick={selectPlayer}>
                    Select a Random Player
                </button>
                <button onClick={countdown}>
                    End of Question (Countdown)
                </button>
            </div>
            <div>
                SPECIAL CIRCUMSTANCES
                <button onClick={nextRound}>
                    Next Round1
                </button>
                <button onClick={allowBuzz}>
                    Force Allow Buzz-ins
                </button>
            </div>
        </div>
    )
}

export default HostUI;