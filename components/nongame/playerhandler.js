import { Gstate } from '../board/socketLogic'
import styles from '../../styles/hostui.module.css'
import React, { useState } from 'react'

const PlayerHandler = () => {
    let { socket } = React.useContext(Gstate) || {}
    let { playerNames } = React.useContext(Gstate) || ['', '', '']
    const [inputs, setInputs] = useState({
        0: '',
        1: '',
        2: '',
    })

    const handleInputChange = (e, playerNum) => {
        let newInputs = Object.assign({}, inputs)
        newInputs[playerNum] = e.target.value;
        setInputs(newInputs);
    }

    const clickHandler = (playerNum, button) => {
        let points = parseInt(inputs[playerNum]);
        if (!isNaN(points) && typeof points === 'number') {
            if (button === '-') points *= -1;

            if (button === '=') {
                socket.emit('set score override', playerNum, points)
            } else {
                socket.emit('add bonus clue points', playerNum, points)
            }

            let newInputs = Object.assign({}, inputs);
            newInputs[playerNum] = '';
            setInputs(newInputs);
        }
    }

    const kickPlayer = (playerNum) => {
        socket.emit('kick player', playerNum);
    } 

    return (
        <div className={styles.playerhandler}>
            {[0, 1, 2].map((i) => {
                return (
                    <div className={styles.playerscorechanger} key={i}>
                        <div className={styles.namescorechanger}>
                            <button className={styles.kickbutton} onClick={() => kickPlayer(i)}>
                                👢
                            </button>
                            {playerNames[i]}
                        </div>
                        <input
                            onChange={(e) => { handleInputChange(e, i) }}
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

export default PlayerHandler;