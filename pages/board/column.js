import React from 'react'
import Cell from './cell'
import styles from '../../styles/board.module.css'
import { Gstate } from './socketLogic'

const Column = (props) => {
    let { round } = React.useContext(Gstate)
    let id = props.id;
    let category = props.category;
    
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
            <div className={styles.header}>{category}</div>
            {setPoints().map((points, i) => {
                return (
                    <Cell
                        points={points}
                        key={`round_${round}_${id}_row_${i}`}
                        id={`${id}_row_${i}`}
                    />)
            })}

        </div>
    )
}

export default Column;