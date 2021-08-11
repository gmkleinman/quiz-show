import { Gstate } from '../board/socketLogic'
import styles from '../../styles/hostui.module.css'
import React, { useState } from 'react'



const ScoreChanger = (props) => {
    let { socket, playerNames } = React.useContext(Gstate)
    const [inputs, setInputs] = useState({})

    const handleInputChange = (e) => {
        let newInputs = Object.assign(inputs);
        newInputs[e.target.name] = e.target.value;
        setInputs(newInputs)
    }

    const clickHandler = (playerNum, button) => {
        let points = inputs[playerNum];
        if (button === '-') points *= -1;

        if (button === '=') {
            socket.emit('set score override', playerNum, points)
        } else {
            socket.emit('add bonus clue points', playerNum, points)
        }

        let newInputs = Object.assign(inputs);
        newInputs[playerNum] = '';
        setInputs(newInputs)
    }

    return (
        <div className={styles.scorechanger}>
            {[0, 1, 2].map((i) => {
                return (
                    <div className={styles.playerscorechanger} key={i}>
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
                            value={inputs[i]}
                        />
                        <div className={styles.pointsbuttons}>
                            <button className={styles.setbutton} onClick={() => clickHandler(i, '=')}>
                                =
                            </button>
                            <button className={styles.addbutton} onClick={() => clickHandler(i, '+')}>
                                +
                            </button>
                            <button className={styles.subtractbutton} onClick={() => clickHandler(i, '-')}>
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