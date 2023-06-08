import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        setUsernameError('');
        setPasswordError('');


        if (username.trim() === '') {
            setUsernameError('Veuillez saisir votre email.');
            return;
        }

        if (password.trim() === '') {
            setPasswordError('Veuillez saisir votre mot de passe.');
            return;
        }

        setUsername('');
        setPassword('');


        const requestBody = {
            "email": username,
            "password": password
        };


        fetch('/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {

                if (data.status === 200) {

                    console.log('Login successful');
                    localStorage.setItem('token', data.body.token);
                    navigate('/user');
                } else {

                    console.log('Login failed:', data.message);
                }
            })
            .catch(error => {

                console.log('Error:', error.message);
            });
    };

    return (
        <div>
            <Nav/>
            <main className="bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && <p className="error-message">{usernameError}</p>}
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                    </form>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default SignIn;