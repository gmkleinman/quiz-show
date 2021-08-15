import React, { useEffect, useState } from 'react'
import styles from '../../styles/finalround.module.css'
import { Gstate } from './socketLogic';


const FinalResponse = (props) => {
    let type = props.type;
    let i = props.i;
    let { socket } = React.useContext(Gstate);
    const [response, setResponse] = useState('-');
    const [show, setShow] = useState(false);

    useEffect(() => {
        socket.on('io sends final responses', (playerInputs) => {
            setResponse(playerInputs[type][i])
        })

        socket.on('io reveals final response', (resType, resPlayer) => {
            if (i === resPlayer && type === resType) {
                setShow(true)
            }
        })
    }, [socket])

    const hiddenStyle = () => {
        if (show) {
            return styles.showresponse;
        } else {
            return styles.hidden;
        }
    }

    return (
        <div className={hiddenStyle()}>
            {response}
        </div>
    )
}

export default FinalResponse;