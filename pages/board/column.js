import React from 'react'
import Cell from './cell'
import styles from '../../styles/board.module.css'

class Column extends React.Component {
    constructor(props) {
        super(props)
        this.points = [200, 400, 600, 800, 1000]
        this.category = props.category;
    }

    render() {
        return (
            <div className={styles.column}>
                <h3>{this.category}</h3>
                {this.points.map((points, i) => {
                    return (
                        <Cell points={points} key={i} />)
                })}

            </div>
        )
    }
}

export default Column;