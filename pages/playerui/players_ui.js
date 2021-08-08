import React from 'react'
import Player from './player'
import styles from '../../styles/players.module.css'
import { Gstate } from '../board/socketLogic';
import Host from './host'


const PlayersUI = (props) => {
    let { playerNames } = React.useContext(Gstate)

    return (
        <div className={styles.playersUI}>
            <div className={styles.playerchunk}>
                <Player name={playerNames[0]} slotNum={0} />
                <Player name={playerNames[1]} slotNum={1} />
            </div>
            <div className={styles.playerchunk}>
                <Player name={playerNames[2]} slotNum={2} />
                <Host name={playerNames[3]}/>
            </div>

        </div>
    )
}

export default PlayersUI;