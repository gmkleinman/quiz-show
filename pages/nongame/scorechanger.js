import { Gstate } from '../board/socketLogic'
import styles from '../../styles/hostui.module.css'
import React, { useState } from 'react'



const ScoreChanger = (props) => {
    let { socket, playerNames } = React.useContext(Gstate)
    const [inputs, setInputs] = useState({})

    const handleInputChange = (e) => {
        setInputs({ [e.target.name]: parseInt(e.target.value) })
    }

    const setScore = (playerNum) => {
        socket.emit('set score override', playerNum, inputs[playerNum])
    }

    const addPoints = (playerNum) => {
        socket.emit('add bonus clue points', playerNum, inputs[playerNum])
    }

    const subtractPoints = (playerNum) => {
        socket.emit('add bonus clue points', playerNum, -1 * inputs[playerNum])
    }

    return (
        <div className={styles.scorechanger}>
            {[0, 1, 2].map((i) => {
                return (
                    <div className={styles.playerscorechanger}>
                        <div className={styles.namescorechanger}>
                            <button className={styles.kickbutton}>
                                👢
                            </button>
                            {playerNames[i]}
                        </div>
                        <input
                            name={i}
                            onChange={(e) => { handleInputChange(e) }}
                            className={styles.scoreinput}
                        />
                        <div className={styles.pointsbuttons}>
                            <button className={styles.setbutton} onClick={() => setScore(i)}>
                                =
                            </button>
                            <button className={styles.addbutton} onClick={() => addPoints(i)}>
                                +
                            </button>
                            <button className={styles.subtractbutton} onClick={() => subtractPoints(i)}>
                                -
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ScoreChanger;