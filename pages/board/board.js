import React from 'react'
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
                {this.categories.map((category, i) => {
                    return (
                        <Column 
                        // category={category} 
                        category="SUPREME COURT JUSTICES AND MORE" 
                        key={i}
                        id={`column_${i}`}
                        />
                    )
                })}

            </div>
        )
    }
}

export default Board;