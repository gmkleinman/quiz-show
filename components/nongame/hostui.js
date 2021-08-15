import ClueLoader from "./clueloader";
import React from 'react'
import PanelButtons from "./panelbuttons";
import styles from '../../styles/hostui.module.css'
import PlayerHandler from "./playerhandler";
import FinalControls from "./finalcontrols";

const HostUI = () => {
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
            <div className={styles.divider}/>
            <div>
                <FinalControls />
            </div>
        </div>
    )
}

export default HostUI;