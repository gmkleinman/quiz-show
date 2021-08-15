import styles from '../../styles/finalround.module.css'
import React, { useEffect, useState } from 'react'
import { Gstate } from '../board/socketLogic';
import FinalInput from './finalinput';
import FinalResponseContainer from './finalresponsecontainer';

const FinalRound = () => {
    const [showClue, setShowClue] = useState(false);
    const [clue, setClue] = useState('');
    let { socket } = React.useContext(Gstate);


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

    const responsesStyle = () => {
        if (showResponses) {
            return styles.hidden;
        } else {
            return null;
        }
    }

    return (
        <div className={styles.finalcontainer}>
            <div className={styles.finalcategory}>
                FINAL CATEGORY
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