import styles from '../../styles/finalround.module.css'
import React, { useEffect, useState } from 'react'
import { Gstate } from '../board/socketLogic';
import FinalInput from './finalinput';
import FinalResponse from './finalresponse';

const FinalRound = () => {
    const [wager, setWager] = useState([]);
    const [showClue, setShowClue] = useState(false);
    const [showWagerIn, setShowWagerIn] = useState(false);
    let { socket } = React.useContext(Gstate);


    useEffect(() => {
        socket.on('io reveals final clue', () => {
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
                    RONALD REAGAN PUT THIS SOUTH AFRICAN ON A TERRORIST WATCH LIST, FORCING HIM TO GET CLEARANCE JUST TO ENTER THE U.S. IN 2008
                </span>
            </div>
            <div>
                <FinalInput type={'wagers'} />
                <FinalInput type={'answers'} />
            </div>
            <div>
                <FinalResponse type={'wagers'} />
                <FinalResponse type={'answers'} />
            </div>
        </div>
    )
}

export default FinalRound;