import React from 'react'
import Cell from './cell'
import styles from '../../styles/board.module.css'
import { Gstate } from './socketLogic'

const Column = (props) => {
    let { round, clueList } = React.useContext(Gstate)
    let id = props.id;
    let num = props.num * round;

    let values;
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
                        {clueList[num][0]}
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