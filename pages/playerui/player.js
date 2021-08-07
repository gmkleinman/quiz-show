import React, { useEffect, useState } from 'react'
import styles from '../../styles/players.module.css'
import { Gstate } from '../board/socketLogic';

const Player = (props) => {
    const [score, setScore] = useState(0);
    let name = props.name;
    let host = props.host;
    let slotNum = props.slotNum;
    let { players, activePlayer, socket, buzzedPlayers, 
        playerName, playerSitting } = React.useContext(Gstate)

    useEffect(() => {
        socket.on('io updating points', (playerPoints) => {
            setScore(playerPoints[slotNum])
        })
    })

    const isMe = () => {
        return (
            <span>
                {(players[slotNum] === socket.id)
                    ?
                    ('(YOU!)')
                    :
                    null}
            </span>
        )
    }

    const isBuzzedBorder = () => {
        if (buzzedPlayers && buzzedPlayers.includes(slotNum)) {
            return {
                container: styles.buzzedplayercontainer,
                score: styles.buzzedscore
            }
        } else if (activePlayer === slotNum) {
            return {
                container: styles.activeplayercontainer,
                score: styles.activescore
            }
        }
        return {
            container: styles.playercontainer,
            score: styles.score,
        }
    }

    const sit = () => {
        socket.emit('player sits down', playerName, slotNum, socket.id)
    }

    return (
        <div className={isBuzzedBorder().container}>
            <div className={styles.topbar}>
                <div className={styles.nameplate}>
                    {name} {isMe()}
                </div>
                {host ?
                    <div className={styles.host} />
                    :
                    <div className={styles.nothost}>
                        <div className={isBuzzedBorder().score}>
                            {score}
                        </div>
                        <div className={styles.timer}>
                        </div>
                    </div>
                }
                {playerSitting || players[slotNum]
                    ?
                    null
                    :
                    <button className={styles.sit} onClick={sit}>
                        SIT
                    </button>
                }
            </div>
        </div>
    )
}

export default Player;