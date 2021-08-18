import styles from '../styles/signin.module.css'

const Form = ({ isLogin, errorMessage, onSubmit }) => (
    <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.form}>
            <span className={styles.span}>Username</span>
            <input className={styles.input} type="text" name="username" required />
        </label>
        <label className={styles.form}>
            <span>Password</span>
            <input className={styles.input} type="password" name="password" required />
        </label>

        <div className="submit">
            {isLogin ?
                <>
                    <button type="submit">Login</button>
                </>
                : null}
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
)

export default Form
