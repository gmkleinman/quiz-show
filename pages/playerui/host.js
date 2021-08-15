import React, { useEffect, useState } from 'react'
import styles from '../../styles/players.module.css'
import { Gstate } from '../board/socketLogic';

const Host = (props) => {
    let name = props.name
    let slotNum = 3;
    const [hostCountdown, setHostCountdown] = useState(false);
    const [bonusCountdown, setBonusCountdown] = useState(false);
    const [finalCountdown, setFinalCountdown] = useState(false);
    let { players, playerSitting, socket, playerName } = React.useContext(Gstate)

    useEffect(() => {
        socket.on('io starts host countdown', () => {
            setHostCountdown(true);
        })

        socket.on("send clue to clients", (clickedid, hideClue) => {
            setHostCountdown(false);
            setBonusCountdown(false);
        })

        socket.on("io starts bonus countdown", () => {
            setBonusCountdown(true);
        })

        socket.on("io begins final timer", () => {
            setFinalCountdown(true);
        })
    })

    const isMe = () => {
        return (
            <span>
                {(players[3] === socket.id) ?
                    ('(YOU!)')
                    : null}
            </span>
        )
    }

    const sit = () => {
        socket.emit('player sits down', playerName, slotNum, socket.id)
    }

    const updateTimer = () => {
        if (hostCountdown) {
            return styles.hosttimeractive
        } else if (bonusCountdown) {
            return styles.bonustimeractive
        } else if (finalCountdown) {
            return styles.finaltimeractive
        } else {
            return styles.hosttimer
        }
    }

    return (
        <div className={styles.playercontainer}>
            <div className={styles.topbar}>
                <div className={styles.nameplate}>
                    {name} {isMe()}
                </div>
                <div className={styles.host} />
                <div className={updateTimer()}>
                </div>
            </div>
            <div className={styles.hostitems}>
                {playerSitting || players[slotNum]
                    ?
                    null
                    :
                    <button className={styles.hostbutton} onClick={sit}>
                        HOST
                    </button>
                }
            </div>
        </div>
    )
}

export default Host;