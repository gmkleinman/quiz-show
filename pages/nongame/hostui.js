import ClueLoader from "./clueloader";
import React from 'react'
import PanelButtons from "./panelbuttons";
import styles from '../../styles/hostui.module.css'
import ScoreChanger from "./scorechanger";

const HostUI = (props) => {
    return (
        <div className={styles.hostuicontainer}>
            <div>
                <ClueLoader />
                <PanelButtons />
            </div>
            <div className={styles.divider}>
            </div>
            <div>
                <ScoreChanger />
            </div>
        </div>

    )
}

export default HostUI;