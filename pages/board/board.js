import React from 'react'
import Column from './column'
import styles from '../../styles/board.module.css'

const Board = (props) => {
    let categories = [];
    let round = props.round

    const initCategories = () => {
        for (let i = 0; i < 6; i++) {
            let category = `Category ${i + 1}`
            categories.push(category);
        }
    }


    initCategories();

    return (
        <div className={styles.board}>
            {categories.map((category, i) => {
                return (
                    <Column
                        category={category} 
                        key={i}
                        round={round}
                        id={`column_${i}`}
                    />
                )
            })}

        </div>
    )
}

export default Board;