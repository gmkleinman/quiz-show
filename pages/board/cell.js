import React, { useEffect, useState } from 'react'
import styles from '../../styles/board.module.css'
import { Gstate } from './socketLogic';

const Cell = (props) => {
    const [classes, setClasses] = useState(styles.cell);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [shown, setShown] = useState(false);
    const [showPoints, setShowPoints] = useState(true);
    const [clueClasses, setClueClasses] = useState(styles.clue);
    const [undo, setUndo] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    let { players, playerNum, socket } = React.useContext(Gstate)
    let points = props.points
    let id = props.id

    useEffect(() => {
        setCSS();
        addListeners();

        socket.on("send clue to clients", (clickedid) => {
            if (!cooldown && id === clickedid) {
                setCooldown(true);
                if (!shown) {
                    setClasses(styles.active)
                    setShowPoints(false)
                    setShown(true)
                    setClueClasses(styles.clue)
                } else {
                    setClasses(styles.seenclue)
                    setShowPoints(true)
                }

                setTimeout(() => {
                    setClueClasses(styles.clue + ' ' + styles.activeclue)
                }, 1);

                setTimeout(() => {
                    setCooldown(false);
                }, 200);
            }
        })
    })

    const addListeners = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Control') {
                setUndo(true);
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Control') {
                setUndo(false);
            }
        })
    }

    const setCSS = () => {
        let bounds = document.getElementById(id).getBoundingClientRect()
        let newTop = bounds.top;
        let newLeft = bounds.left;
        setTop(newTop)
        setLeft(newLeft)
    }

    const handleClick = (e) => {
        socket.emit("clue clicked", id, points)
    }

    const handleUndo = (e) => {
        if (undo && playerNum === 3) {
            setClasses(styles.cell)
            setShown(false)
            setShowPoints(true)
            setClueClasses(styles.clue)
            setTimeout(() => {
                setCSS();
            }, 1);
        }
    }

    return (
        <div className={styles.cellcontainer} onClick={handleUndo}>
            <div id={id} className={classes}
                onClick={handleClick}
                style={{ top: top, left: left }}
            >
                {
                    showPoints ?
                        (<div className={styles.points}>{points}</div>)
                        : (<div className={clueClasses}>
                            ALLIE IS A CLUE IN THIS GAME BECAUSE SHE IS MY FAVORITE AND I LOVE HER AND I DON'T KNOW HOW LONG THESE CLUES USUALLY ARE
                        </div>)
                }
            </div>
        </div>
    )
}

export default Cell;