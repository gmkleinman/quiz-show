import React from 'react'
import Cell from './cell'
import Column from './column'
import styles from '../../styles/board.module.css'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.categories = [];
        this.initCategories();
    }

    initCategories() {
        for (let i = 0; i < 6; i++) {
            let category = `Category ${i + 1}`
            this.categories.push(category);
        }
    }

    render() {
        return (
            <div className={styles.board}>
                {/* {Array.from(Array(6), (e, i) => {
                    return(
                        <Column key={asdf_${i}}/>
                    )
                })} */}
                {this.categories.map((category, i) => {
                    return (
                        <Column category={category} key={i} />
                    )
                })}

            </div>
        )
    }
}

export default Board;