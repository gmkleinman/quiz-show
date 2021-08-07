import React, { useEffect, useState } from 'react'
import styles from '../../styles/board.module.css'
import { Gstate } from './socketLogic';

const Cell = (props) => {
    const [classes, setClasses] = useState(styles.cell);
    const [showPoints, setShowPoints] = useState(true);
    const [shown, setShown] = useState(false);
    const [clueClasses, setClueClasses] = useState(styles.clue);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [cooldown, setCooldown] = useState(false);
    const [origin, setOrigin] = useState([0, 0])
    const [gotOrigin, setGotOrigin] = useState(false)
    let { socket, round, undo } = React.useContext(Gstate)
    let points = props.points
    let id = props.id

    useEffect(() => {
        socket.on("send clue to clients", (clickedid, hideClue) => {
            if (!cooldown && id === clickedid) {
                setCooldown(true);
                if (!hideClue) {
                    setClasses(styles.active)
                    setShowPoints(false)
                    setShown(true)
                    setClueClasses(styles.clue)
                } else {
                    setClasses(styles.seenclue)
                    setShowPoints(true)
                    socket.emit('disable buzz ins')
                }

                setTimeout(() => {
                    setClueClasses(styles.clue + ' ' + styles.activeclue)
                }, 1);

                setTimeout(() => {
                    setCooldown(false);
                }, 200);
            }
        })

        socket.on("io sends clue reset", (resetid) => {
            if (resetid === id) {
                resetClue();
            }
        })

    }, [shown])

    useEffect(() => {
        setCoordinates();
        resetClue();
    }, [origin, round])

    useEffect(() => {
        socket.emit("get initial clue status")

        socket.on("io sends clue status", shownClues => {
            if (shownClues[id]) {
                setShown(true);
                setClasses(styles.seenclue)
            }
        })
    }, [])

    const setCoordinates = () => {
        if (!gotOrigin) {
            let bounds = document.getElementById(id).getBoundingClientRect()
            setGotOrigin(true)
            setOrigin([bounds.left, bounds.top])
            setTop(bounds.top)
            setLeft(bounds.left)
        }
    }

    const handleClick = (e) => {
        socket.emit("clue clicked", id, points, shown)
    }

    const handleUndo = (e) => {
        // BEFOREPRODUCTION: MAKE IT SO ONLY PLAYER NUM 3 CAN DO THIS - HOST
        if (undo) {
            socket.emit("clue reset", id)
        }
    }

    const resetClue = () => {
        setClasses(styles.cell)
        setShowPoints(true)
        setShown(false)
        setClueClasses(styles.clue)
        setTop(origin[1])
        setLeft(origin[0])
    }

    return (
        <div className={styles.cellcontainer}
            onClick={handleUndo}
        >
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