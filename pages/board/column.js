import React from 'react'
import Cell from './cell'
import styles from '../../styles/board.module.css'

class Column extends React.Component {
    constructor(props) {
        super(props)
        this.id = props.id;
        this.points = [200, 400, 600, 800, 1000]
        this.category = props.category;
    }

    render() {
        return (
            <div className={styles.column}>
                <div className={styles.header}>{this.category}</div>
                {this.points.map((points, i) => {
                    return (
                        <Cell 
                        points={points} 
                        key={i} 
                        id={`${this.id}_row_${i}`}
                        />)
                })}

            </div>
        )
    }
}

export default Column;