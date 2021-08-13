import styles from '../../styles/finalround.module.css'

const FinalRound = () => {
    return (
        <div className={styles.finalcontainer}>
            <div className={styles.finalcategory}>
                FINAL CATEGORY
            </div>
            <div className={styles.finalclue}>
                RONALD REAGAN PUT THIS SOUTH AFRICAN ON A TERRORIST WATCH LIST, FORCING HIM TO GET CLEARANCE JUST TO ENTER THE U.S. IN 2008
            </div>
            <div className={styles.responsecontainer}>
                {[0, 1, 2].map(playerNum => {
                    return (
                        <div className={styles.responses} key={playerNum}>
                            <div>
                                Answer {playerNum}
                            </div>
                            <div>
                                Wager {playerNum}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FinalRound;