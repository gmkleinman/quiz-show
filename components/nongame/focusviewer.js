import React, { useEffect, useState } from 'react'

const FocusViewer = () => {
    const [localFocusLog, setLocalFocusLog] = useState({});
    // useEffect(() => {
    //     socket.on('update window focus', focusLog, playerNum, playerFocus, () => {
    //         setLocalFocusLog(focusLog);
    //         updatePlayerFocus(playerNum, playerFocus);
    //     })
    // }, [])


    return (
        <div>
            Focusviewer is here
            <br/>
        </div>
    )
}

export default FocusViewer;