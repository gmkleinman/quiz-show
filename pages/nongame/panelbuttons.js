import React, { useState } from "react";
import styles from '../../styles/hostui.module.css'
import { Gstate } from '../board/socketLogic';


const PanelButtons = (props) => {
    let { socket } = React.useContext(Gstate);
    const [status, setStatus] = useState(true);

    const correct = () => {
        socket.emit('clue answered', true)
    }

    const incorrect = () => {
        socket.emit('clue answered', false)
    }

    const countdown = () => {
        socket.emit('start host countdown')
    }

    const selectPlayer = () => {
        socket.emit('select buzz in')
    }

    const allowBuzz = () => {
        socket.emit('allow buzz ins')
        setStatus(true)
    }

    const nextRound = () => {
        socket.emit('round change')
        setStatus(true)
    }

    const resetGame = () => {
        socket.emit('reset game')
        setStatus(true)
    }

    const enableButtons = () => {
        setStatus(false)
    }

    const rarestyle = () => {
        if (status) {
            return styles.rarebuttondisabled
        } else {
            return null
        }
    }

    return (
        <>
            <div className={styles.commoncontainer}>
                <div className={styles.buttoncontainer}>
                    <button className={styles.incorrect} onClick={countdown}>
                        ⏲
                    </button>
                </div>
                <div>
                    <button className={styles.randombutton} onClick={selectPlayer}>
                        👨‍👩‍👧‍👦
                    </button>
                </div>
                <div className={styles.buttoncontainer}>
                    <button className={styles.correct} onClick={correct}>
                        ✓
                    </button>
                    <button className={styles.incorrect} onClick={incorrect}>
                        ❌
                    </button>
                </div>
            </div>
            <div className={styles.commoncontainer}>
                <button onClick={enableButtons}>
                    Click to Enable
                </button>
                <div className={styles.rarebuttons}>
                    <button onClick={nextRound} disabled={status} className={rarestyle()}>
                        Next Round
                    </button>
                    <button onClick={resetGame} disabled={status} className={rarestyle()}>
                        Reset Game
                    </button>
                    <button onClick={allowBuzz} disabled={status} className={rarestyle()}>
                        Force Allow Buzz-ins
                    </button>
                </div>
            </div>
        </>
    )
}

export default PanelButtons;