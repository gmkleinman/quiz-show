import React, { useEffect, useState } from 'react'
import styles from '../../styles/hostui.module.css'
import { Gstate } from '../board/socketLogic';


const FinalControls = () => {
    let { socket, playerNames } = React.useContext(Gstate);
    const [status, setStatus] = useState(true);
    const [answers, setAnswers] = useState(['placeholder', 'placeholder', 'placeholder']);
    const [wagers, setWagers] = useState([0, 0, 0]);

    useEffect(() => {
        socket.on('io sends player inputs', (playerInputs) => {
            setAnswers(playerInputs.answers)
            setWagers(playerInputs.wagers)
        })
    }, [socket])

    const finalRound = () => {
        socket.emit('final round');
    }

    const revealFinal = () => {
        socket.emit('reveal final clue');
    }

    const toggleFinal = () => {
        setStatus(!status);
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
            <div className={styles.clueloadercontainer}>
                <button onClick={toggleFinal}>
                    Click to Enable/Disable
                </button>
                <div className={styles.rarebuttons}>
                    <button onClick={finalRound} disabled={status} className={rarestyle()}>
                        Final Round
                    </button>
                    <button onClick={revealFinal} disabled={status} className={rarestyle()}>
                        Reveal Clue
                    </button>
                    <button onClick={finalRound} disabled={status} className={rarestyle()}>
                        Set Timer TODO
                    </button>
                </div>
            </div>

            <div className={styles.responsescontainer}>
                <div>
                    {[0, 1, 2].map((i) => {
                        return (
                            <div className={styles.responses} key={i}>
                                <button onClick={finalRound} disabled={status} className={rarestyle()}>
                                    {playerNames[i]}
                                </button>

                                <div>
                                    $: {wagers[i]}
                                </div>
                                <div>
                                    A: {answers[i]}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default FinalControls;