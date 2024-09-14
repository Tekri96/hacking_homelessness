import React, { useState, useEffect } from 'react';
import { auth } from '@/frontend/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import styles from './AuthForm.module.css';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Generate a random avatar URL
                setAvatarUrl(`https://robohash.org/${currentUser.uid}?set=set2&size=150x150`);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            setError('Failed to sign out. Please try again.');
        }
    };

    if (user) {
        return (
            <div className={styles.loggedInContainer}>
                <img src={avatarUrl} alt="User Avatar" className={styles.avatar} />
                <h2>Welcome, {user.displayName ?? 'Guest'}!</h2>
                <p>{user.email}</p>
                <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
            </div>
        );
    }

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <h2>{isSignUp ? 'Hola! Welcome to the community' : 'Sign In to continue'}</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? <div className={styles.spinner}></div> : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.switchMode}>
                    {isSignUp ? 'Already have an account?' : 'Need an account?'}
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)} className={styles.switchButton}>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;