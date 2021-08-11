import React, { useEffect, useState } from 'react'
import Cell from './cell'
import styles from '../../styles/board.module.css'
import { Gstate } from './socketLogic'

const Column = (props) => {
    let { round, clueList, socket } = React.useContext(Gstate)
    const [title, setTitle] = useState('');
    let id = props.id;
    let num = props.num * round;
    let values;

    useEffect(() => {
        socket.on('io sends clear category', categoryNum => {
            // element 7 is the column # in the id
            // might go back and fix this to not be dumb and hardcoded
            if (categoryNum === id[7]) setTitle('')
        })
    }, [socket])

    useEffect(() => {
        if (clueList && clueList[num]) setTitle(clueList[num][0])
    }, [clueList])

    const setPoints = () => {
        if (round === 1) {
            values = [200, 400, 600, 800, 1000]
        } else {
            values = [400, 800, 1200, 1600, 2000]
        }
        return values;
    }

    return (
        <div className={styles.column}>
            {clueList && clueList[num]
                ?
                <>
                    <div className={styles.header}>
                        {title}
                    </div>
                    {setPoints().map((points, i) => {
                        return (
                            <Cell
                                points={points}
                                key={`round_${round}_${id}_row_${i}`}
                                id={`${id}_row_${i}`}
                                text={clueList[num][i + 1]}
                            />)
                    })}
                </>
                :
                <>
                    {/* make a board with blank cells if clues haven't been loaded */}
                    <div className={styles.header}>
                    </div>
                    {setPoints().map((i) => {
                        return (
                            <Cell
                                points={''}
                                key={`round_${round}_${id}_row_${i}`}
                                id={`${id}_row_${i}`}
                            />)
                    })}
                </>
            }

        </div>
    )
}

export default Column;