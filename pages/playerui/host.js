import React from 'react'
import styles from '../../styles/players.module.css'
import { Gstate } from '../board/socketLogic';

const Host = (props) => {
    let name = props.name;
    let { players, playerNum, socket } = React.useContext(Gstate)

    const isMe = () => {
        return (
            <span>
                {(players[3] === socket.id) ?
                    ('(YOU!)')
                    : null}
            </span>
        )
    }
    
    return (
        <div className={styles.playercontainer}>
            <div className={styles.topbar}>
                <div className={styles.nameplate}>
                    {name} {isMe()}
                </div>
                <div className={styles.host} />
            </div>
        </div>
    )
}

export default Host;