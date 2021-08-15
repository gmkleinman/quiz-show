import React, { useEffect, useState } from 'react'
import styles from '../../styles/hostui.module.css'
import { Gstate } from '../board/socketLogic';


const FinalControls = () => {
    let { socket, playerNames } = React.useContext(Gstate);
    const [status, setStatus] = useState(true);
    const [answers, setAnswers] = useState(['', '', '']);
    const [wagers, setWagers] = useState(['', '', '']);

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

    const beginTimer = () => {
        socket.emit('begin final timer');
    }

    const rarestyle = () => {
        if (status) {
            return styles.rarebuttondisabled;
        } else {
            return null;
        }
    }

    const revealResponse = (resType, i) => {
        socket.emit('reveal final response', resType, i);
        console.log("REVEALING RESPONSE")
        console.log(resType)
        console.log(i)
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
                    <button onClick={beginTimer} disabled={status} className={rarestyle()}>
                        Set Timer
                    </button>
                </div>
            </div>

            <div className={styles.responsescontainer}>
                <div>
                    {[0, 1, 2].map((i) => {
                        return (
                            <div className={styles.responses} key={i}>
                                {playerNames[i]}
                                <div>
                                    <button
                                        className={styles.revealresponse}
                                        onClick={() => revealResponse('answers', i)}
                                    >
                                        A
                                    </button>
                                    {answers[i]}
                                </div>
                                <div>
                                    <button
                                        className={styles.revealresponse}
                                        onClick={() => revealResponse('wagers', i)}
                                    >
                                        $
                                    </button>
                                    {wagers[i]}
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