import React from 'react'
import styles from '../../styles/board.module.css'


class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.points = props.points;
        this.id = props.id;
        this.cooldown = false;
        this.undo = false;
        this.state = {
            classes: styles.cell,
            top: 0,
            left: 0,
            shown: false,
            showPoints: true,
            clueClasses: styles.clue,
        }
    }

    componentDidMount() {
        this.setCSS();
        this.addListeners();
    }

    addListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Control') {
                this.undo = true;
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Control') {
                this.undo = false;
            }
        })
    }

    setCSS() {
        let bounds = document.getElementById(this.id).getBoundingClientRect()
        let top = bounds.top;
        let left = bounds.left;
        this.setState({
            top,
            left,
        })
    }

    handleClick(e) {
        if (!this.cooldown) {
            this.cooldown = true;
            if (!this.state.shown) {
                this.setState({
                    classes: styles.active,
                    showPoints: false,
                    shown: true,
                })
            } else {
                this.setState({
                    classes: styles.seenclue,
                    showPoints: true,
                })
            }

            setInterval(() => {
                this.setState({
                    clueClasses: styles.clue + ' ' + styles.activeclue,
                })
            }, 1);

            setInterval(() => {
                this.cooldown = false;
            }, 1000);
        }
    }

    handleUndo(e) {
        if (this.undo) {
            console.log("inside handle click undoing")
            this.setState({
                classes: styles.cell,
                shown: false,
                showPoints: true,
                clueClasses: styles.clue,
            })
            setInterval(() => {
                this.setCSS();
            }, 1);
        }
    }

    render() {
        return (
            <div className={styles.cellcontainer} onClick={this.handleUndo.bind(this)}>
                <div id={this.id} className={this.state.classes}
                    onClick={this.handleClick.bind(this)}
                    style={{ top: this.state.top, left: this.state.left }}
                >
                    {
                        this.state.showPoints ?
                            (<div className={styles.points}>{this.points}</div>)
                            : (<div className={this.state.clueClasses}>
                                ALLIE IS A CLUE IN THIS GAME BECAUSE SHE IS MY FAVORITE AND I LOVE HER AND I DON'T KNOW HOW LONG THESE CLUES USUALLY ARE
                            </div>)
                    }
                </div>
            </div>
        )
    }
}

export default Cell;