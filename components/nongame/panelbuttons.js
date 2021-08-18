import React, { useState } from "react";
import styles from '../../styles/hostui.module.css'
import { Gstate } from '../board/socketLogic';

const PanelButtons = () => {
    let { socket } = React.useContext(Gstate) || {}
    const [status, setStatus] = useState(true);

    const correct = () => {
        socket.emit('clue answered', true)
    }

    const incorrect = () => {
        socket.emit('clue answered', false);
    }

    const countdown = () => {
        socket.emit('start host countdown');
    }

    const selectPlayer = () => {
        socket.emit('select buzz in');
    }

    const allowBuzz = () => {
        socket.emit('allow buzz ins');
        setStatus(true);
    }

    const nextRound = () => {
        socket.emit('round change');
        setStatus(true);
    }

    const resetGame = () => {
        socket.emit('reset game');
        setStatus(true);
    }

    const enableButtons = () => {
        setStatus(false);
        setTimeout(() => {
            setStatus(true);
        }, 5000)
    }

    const bonusCountdown = () => {
        socket.emit('start bonus countdown');
    }

    const rarestyle = () => {
        if (status) {
            return styles.rarebuttondisabled;
        } else {
            return null;
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
                <button className={styles.otherbutton} onClick={enableButtons}>
                    Enable
                </button>
                <div className={styles.rarecontainer}>
                    <div className={styles.rarebuttons}>
                        <button onClick={bonusCountdown} disabled={status} className={rarestyle()}>
                            Bonus Timer
                        </button>
                        <button onClick={nextRound} disabled={status} className={rarestyle()}>
                            Next Round
                        </button>
                    </div>
                    <div className={styles.rarebuttons}>
                        <button onClick={allowBuzz} disabled={status} className={rarestyle()}>
                            Force Allow Buzz-ins
                        </button>
                        <button onClick={resetGame} disabled={status} className={rarestyle()}>
                            Reset Game
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PanelButtons;