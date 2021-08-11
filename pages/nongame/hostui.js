import ClueLoader from "./clueloader";
import React from 'react'
import PanelButtons from "./panelbuttons";
import styles from '../../styles/hostui.module.css'
import PlayerHandler from "./playerhandler";

const HostUI = (props) => {
    return (
        <div className={styles.hostuicontainer}>
            <div>
                <ClueLoader />
                <PanelButtons />
            </div>
            <div className={styles.divider}/>
            <div>
                <PlayerHandler />
            </div>
        </div>
    )
}

export default HostUI;