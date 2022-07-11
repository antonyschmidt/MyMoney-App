import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
//styles
import styles from './Signup.module.css'

export default function Signup() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, isPending, signup } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        signup(email, password, displayName)
    }

    return (
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <label>
                <span>Display Name:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className='btn'>Submit</button>}
            {isPending && <button className='btn' disabled>Loading</button>}
            {error && <p className='err'>{error}</p>}
        </form>
    )
}
