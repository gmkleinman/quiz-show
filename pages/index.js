import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useUser } from '../lib/hooks'

const Home = () => {
    const router = useRouter()
    const user = useUser({ redirectTo: '/login' })


    useEffect(() => {
        user ?
            router.push('/game')
            :
            null
    })

    return (
        <>
        </>
    )
}

export default Home