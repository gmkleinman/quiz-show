import React from 'react'
import Player from './player'
import styles from '../../styles/players.module.css'
import { Gstate } from '../board/socketLogic';



const PlayersUI = (props) => {
    let playerNames = ['Allie', 'Grant', 'misterlongname', 'Host']
    let {players, playerNum, socket} = React.useContext(Gstate)

    return (
        <div className={styles.playersUI}>
            {/* {socket ?
                <div>
                    Socket: {socket.id}
                </div>
                : null
            } */}
            <div className={styles.playerchunk}>
                <Player name={playerNames[0]} slotNum={0} />
                <Player name={playerNames[1]} slotNum={1} />
            </div>
            <div className={styles.playerchunk}>
                <Player name={playerNames[2]} slotNum={2} />
                <Player name={playerNames[3]} slotNum={3}
                    host={true} />
            </div>

        </div>
    )
}

export default PlayersUI;