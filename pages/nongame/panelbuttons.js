import React from "react";
import styles from '../../styles/hostui.module.css'
import { Gstate } from '../board/socketLogic';


const PanelButtons = (props) => {
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
                <div className={styles.buttoncontainer}>
                    <button onClick={nextRound}>
                        Next Round
                    </button>
                    <button onClick={allowBuzz}>
                        Force Allow Buzz-ins
                    </button>
                </div>
            </div>
        </>
    )
}

export default PanelButtons;