import { Link } from 'react-router-dom'
//hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
//styles
import styles from './Navbar.module.css'

export default function Navbar() {
    const { logout, error, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link to='/'>MyMoney</Link></li>

                {error && <p>{error}</p>}
                {isPending && <p>Loading...</p>}
                {!user && (<>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>)}

                {user && (
                    <>
                        <li>hello, {user.displayName}</li>
                        <li>
                            <button className='btn' onClick={() => logout()}>Logout</button>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    )
}
