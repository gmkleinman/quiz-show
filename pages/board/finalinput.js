import React, { useEffect, useState } from 'react'
import styles from '../../styles/finalround.module.css'
import { Gstate } from './socketLogic';

const FinalInput = (props) => {
    let type = props.type;
    let { socket, playerNum } = React.useContext(Gstate);
    const [input, setInput] = useState('');
    // const [hidden, setHidden] = useState(true);
    const [revealType, setRevealType] = useState('wagers')

    useEffect(() => {
        socket.on('io reveals final clue', () => {
            setRevealType('answers');
        })

        socket.on('io ends final timer', () => {
            setRevealType('none');
        })
    }, [socket])

    const handleInput = (e) => {
        setInput(e.target.value);
        socket.emit('player input changed', type, e.target.value, playerNum)
    }

    const visibility = () => {
        if (revealType === type && playerNum != 3) {
            return null;
        } else {
            return styles.hidden;
        }
    }

    return (
        <div className={visibility()}>
            <input
                onChange={(e) => { handleInput(e) }}
                value={input}
                className={styles.responseInput}
            />
        </div>
    )
}

export default FinalInput;