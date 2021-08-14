import React, { useState } from 'react'
import styles from '../../styles/finalround.module.css'
import { Gstate } from './socketLogic';


const FinalResponse = (props) => {
    let type = props.type;
    let { socket, playerNum } = React.useContext(Gstate);
    const [response, setResponse] = useState([]);
    const [showResponses, setShowResponses] = useState(false);

    const handleResponse = (e) => {
        setResponse(e.target.value);
    }

    return (
        <div className={styles.responses}>
            {type} {playerNum}
        </div>
    )
}

export default FinalResponse;