import Head from 'next/head'
import Image from 'next/image'
import SocketLogic from '../components/board/socketLogic'
import styles from '../styles/board.module.css'

export default function Home() {
    return (
        <div className={styles.appcontainer}>
            <Head>
                <title>Potat Show</title>
                <meta name="potat runs games" content="Potat" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SocketLogic />
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
        </div>
    )
}
