import styles from '../../styles/finalround.module.css'
import React, { useEffect, useState } from 'react'
import { Gstate } from './socketLogic';
import FinalInput from './finalinput';
import FinalResponseContainer from './finalresponsecontainer';

const FinalRound = () => {
    const [showClue, setShowClue] = useState(false);
    const [clue, setClue] = useState('');
    let { socket,  clueList} = React.useContext(Gstate) || {}
    let finalCategory = clueList['13'][0];

    useEffect(() => {
        socket.on('io reveals final clue', (finalClue) => {
            setClue(finalClue);
            setShowClue(true);
        })
    }, [socket])

    const finalClueStyle = () => {
        if (showClue) {
            return null;
        } else {
            return styles.hidden;
        }
    }

    return (
        <div className={styles.finalcontainer}>
            <div className={styles.finalcategory}>
                {finalCategory}
            </div>
            <div className={styles.finalclue}>
                <span className={finalClueStyle()}>
                    {clue}
                </span>
            </div>
            <div>
                <FinalInput type={'wagers'} />
                <FinalInput type={'answers'} />
            </div>
            <FinalResponseContainer />
        </div>
    )
}

export default FinalRound;