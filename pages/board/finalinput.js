import React, { useState } from 'react'
import styles from '../../styles/finalround.module.css'
import { Gstate } from './socketLogic';

const FinalInput = (props) => {
    let type = props.type;
    let { socket, playerNum } = React.useContext(Gstate);
    const [input, setInput] = useState('');
 
    const handleInput = (e) => {
        setInput(e.target.value);
        socket.emit('player input changed', type, e.target.value, playerNum)
    }

    return (
        <div>
            {type}
            <input
                onChange={(e) => { handleInput(e) }}
                value={input}
            />
        </div>
    )
}

export default FinalInput;