import React from 'react'
import styles from '../../styles/players.module.css'
import { Gstate } from '../board/socketLogic';

const Player = (props) => {
    let name = props.name;
    let host = props.host;
    let score = 0;
    let slotNum = props.slotNum;
    let { players, activePlayer, socket, buzzedPlayers } = React.useContext(Gstate)

    const isMe = () => {
        return (
            <span>
                {(players[slotNum] === socket.id) ?
                    ('(YOU!)')
                    : null}
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
            </div>
        </div>
    )
}

export default Player;