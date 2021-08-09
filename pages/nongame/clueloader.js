import React, { useEffect, useState } from 'react'
import { Gstate } from '../board/socketLogic'

const ClueLoader = (props) => {
    let { socket } = React.useContext(Gstate)
    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const loadClues = () => {
        let clueList = {};
        let clues = input.split(";;;")
        let categoryIndex = 0;
        for (let i = 0; i < clues.length; i++) {
            let clue = clues[i]
            if (i % 6 === 0) {
                categoryIndex++;
                clueList[categoryIndex] = [clue];
            } else {
                clueList[categoryIndex].push(clue);
            }
        }

        socket.emit('load clues', clueList)
    }

    return (
        <div>
            <input
                type='password'
                onChange={(e) => { handleInput(e) }}
            />
            <button onClick={loadClues}>
                Load Clues
            </button>
        </div>
    )
}

export default ClueLoader;