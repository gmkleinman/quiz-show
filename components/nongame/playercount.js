import React, { useContext } from "react";
import { Gstate } from '../board/socketLogic'
import styles from '../../styles/hostui.module.css'

const PlayerCount = () => {
    let { userCount } = React.useContext(Gstate) || {}
    return (
        <div className={styles.playercount}>
            Users: {userCount}
        </div>
    )
}

export default PlayerCount;