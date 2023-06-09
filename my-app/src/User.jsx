import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BiUserCircle} from 'react-icons/bi';
import {FiLogOut} from 'react-icons/fi';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, updateUser} from './Action';

function UserPage() {
    const dispatch = useDispatch();
    const {user, token} = useSelector(state => state);
    console.log(user);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const [editedUser, setEditedUser] = useState({...user});

    useEffect(() => {
    if (!user && !token) {
        navigate('/user/login');
    } else {
        if (user && user.firstName && user.lastName) {
            setEditedUser({...user});
        }
    }
}, [user, token, navigate]);

    const handleSaveName = () => {
        fetch('/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstName: editedUser.firstName,
                lastName: editedUser.lastName,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    dispatch(updateUser(editedUser));
                    setIsEditing(false);
                } else {
                    console.log('Failed to update name:', data.message);
                }
            })
            .catch(error => {
                 navigate('/user/login');
                console.log('Error:', error.message);
            });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser({...user});
    };

   const handleSignOut = () => {
  if (!isHomePage) {
    dispatch(logOut());
  }
  navigate('/');
};




    return (
        <div>
            <nav className="main-nav">
                <Link className="main-nav-logo" to={'/'} onClick={() => setIsHomePage(true)}>
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
                        <BiUserCircle/> {`${editedUser.firstName}`}
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
                        {!isEditing && `${editedUser.firstName} ${editedUser.lastName}`}
                    </h1>
                    {isEditing ? (
                        <div className="">
                            <div>
                                <input
                                    type="text"
                                    value={editedUser.firstName}
                                    className="prenom"
                                    onChange={e => setEditedUser({...editedUser, firstName: e.target.value})}
                                    placeholder={editedUser.firstName} // Ici, la valeur de placeholder sera remplacée par le prénom actuel
                                />
                                <input
                                    type="text"
                                    className="nom"
                                    value={editedUser.lastName}
                                    onChange={e => setEditedUser({...editedUser, lastName: e.target.value})}
                                    placeholder={editedUser.lastName} // Ici, la valeur de placeholder sera remplacée par le nom actuel
                                />
                            </div>
                            <div>
                                <button onClick={handleSaveName} className="btnsave">Save</button>
                                <button onClick={handleCancelEdit} className="btncancel">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="btnedit">Edit Name</button>
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
