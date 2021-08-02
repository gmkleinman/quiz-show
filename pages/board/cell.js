import React from 'react'
import styles from '../../styles/board.module.css'


class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.points = props.points;
    }

    render() {
        return (
            <div className={styles.cell}>
                {this.points}
            </div>
        )
    }
}

export default Cell;