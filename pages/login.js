import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Form from '../components/form'
import styles from '../styles/signin.module.css'

const Login = () => {
    const user = useUser();
    const [errorMsg, setErrorMsg] = useState('')
    useUser({ redirectTo: '/game', redirectIfFound: true })

    async function handleSubmit(e) {
        e.preventDefault()

        if (errorMsg) setErrorMsg('')

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                Router.push('/')
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setErrorMsg(error.message)
        }
    }

    return (
        <>
            {user ?
                null :
                <div className={styles.login}>
                    <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
                </div>
            }
        </>
    )
}

export default Login
