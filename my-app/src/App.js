import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './Store';
import HomePage from './HomePage';
import SignInPage from "./SignInPage";
import User from "./User";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="user/login" element={<SignInPage/>}/>
                    <Route path="/user/profile" element={<User/>}/>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
