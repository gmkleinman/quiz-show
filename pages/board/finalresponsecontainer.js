import React, { useEffect, useState } from 'react'
import FinalResponse from './finalresponse'
import styles from '../../styles/finalround.module.css'
import { Gstate } from './socketLogic';

const FinalResponseContainer = () => {
    const [showResponses, setShowResponses] = useState(false);
    let { socket } = React.useContext(Gstate);

    useEffect(() => {
        socket.on('io sends final responses', () => {
            setShowResponses(true);
        })
    }, [socket])

    const hiddenStyle = () => {
        if (showResponses) {
            console.log("showing test")
            return styles.responsecontainer;
        } else {
            return styles.hidden + ' ' +  styles.responsecontainer
        }
    }

    return (
        <div className={styles.finalresponsecont}>
            {[0, 1, 2].map((i) => {
                return (
                    <div className={hiddenStyle()} key={i}>
                        <FinalResponse type={'answers'} i={i} />
                        <FinalResponse type={'wagers'} i={i} />
                    </div>
                )
            })}
        </div>
    )
}

export default FinalResponseContainer;