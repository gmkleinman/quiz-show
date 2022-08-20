import ClueLoader from "./clueloader";
import React from 'react';
import PanelButtons from "./panelbuttons";
import styles from '../../styles/hostui.module.css';
import PlayerHandler from "./playerhandler";
import FinalControls from "./finalcontrols";
import PlayerCount from "./playercount";
import FocusViewer from "./focusviewer";

const HostUI = () => {
    return (
        <div className={styles.hostuicontainer}>
            <div>
                <ClueLoader />
                <PanelButtons />
            </div>

            <div className={styles.divider} />

            <div>
                <PlayerCount />
                <PlayerHandler />
            </div>

            <div className={styles.divider} />
            
            <div>
                <FinalControls />
            </div>

            <div>
                <FocusViewer />
            </div>
        </div>
    )
}

export default HostUI;