import SocketLogic from '../../components/board/socketLogic'
import styles from '../../styles/board.module.css'
import { useUser } from '../../lib/hooks'

const Game = () => {
    const user = useUser({ redirectTo: '/login' })

    return (
        <div className={styles.appcontainer}>
            {user ?
                <>
                    <SocketLogic host={user.host}/>
                </>
                :
                null
            }
        </div>
    )
}

export default Game;