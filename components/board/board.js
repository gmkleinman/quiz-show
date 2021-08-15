import React from 'react'
import Column from './column'
import styles from '../../styles/board.module.css'

const Board = () => {
    return (
        <div className={styles.board}>
            {[0,1,2,3,4,5].map((category, i) => {
                return (
                    <Column
                        key={category}
                        id={`column_${i}`}
                        num={i+1}
                    />
                )
            })}
        </div>
    )
}

export default Board;