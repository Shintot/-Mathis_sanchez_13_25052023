import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BiUserCircle} from 'react-icons/bi';
import {FiLogOut} from 'react-icons/fi';

function UserPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedLastName, setEditedLastName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {

            navigate('/api/v1/user/login');
            return;
        }
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/v1/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();

                if (response.ok && data.body.firstName && data.body.lastName) {
                    setFirstName(data.body.firstName);
                    setLastName(data.body.lastName);
                } else {
                    console.log('Failed to fetch user data');
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        };

        fetchUserData().then(r => r);
    }, []);

    const handleEditName = () => {
        setIsEditing(true);
        setEditedFirstName(firstName);
        setEditedLastName(lastName);
    };

    const handleSaveName = () => {
        const updatedData = {
            firstName: editedFirstName,
            lastName: editedLastName,
        };

        fetch('/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(data => {

                if (data.status === 200) {

                    setFirstName(editedFirstName);
                    setLastName(editedLastName);

                    setEditedFirstName('');
                    setEditedLastName('');
                    setIsEditing(false);

                    console.log('Name updated successfully');
                } else {
                    console.log('Failed to update name:', data.message);
                }
            })
            .catch(error => {
                console.log('Error:', error.message);
            });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedFirstName('');
        setEditedLastName('');
    };

    const handleSignOut = () => {
        setEditedFirstName('');
        setEditedLastName('');
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <nav className="main-nav">
                <Link className="main-nav-logo" to={'/'}>
                    <img
                        className="main-nav-logo-image"
                        src="https://res.cloudinary.com/dtx8credj/image/upload/v1684236293/argentBankLogo_mnzrjl.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to="/user">
                        <i className="fa fa-user-circle"></i>
                        <BiUserCircle/> {`${firstName}`}
                    </Link>
                    <Link className="main-nav-item" to="/" onClick={handleSignOut}>
                        <FiLogOut/>
                        Sign Out
                    </Link>
                </div>
            </nav>
            <main className="main bg-darkuser">
                <div className="header">
                    <h1 className="titre">
                        Welcome back<br/>
                        {!isEditing && `${firstName} ${lastName}`}
                    </h1>
                    {isEditing ? (
                        <div className="">
                            <div>
                                <input
                                    type="text"
                                    value={editedFirstName}
                                    className="prenom"
                                    onChange={e => setEditedFirstName(e.target.value)}
                                    placeholder={firstName} // Ici, la valeur de placeholder sera remplacée par le prénom actuel
                                />
                                <input
                                    type="text"
                                    className="nom"
                                    value={editedLastName}
                                    onChange={e => setEditedLastName(e.target.value)}
                                    placeholder={lastName} // Ici, la valeur de placeholder sera remplacée par le nom actuel
                                />
                            </div>
                            <div>
                                <button onClick={handleSaveName} className="btnsave">Save</button>
                                <button onClick={handleCancelEdit} className="btncancel">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <button className="edit-button" onClick={handleEditName}>
                            Edit Name
                        </button>
                    )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </div>
    );
}

export default UserPage;
