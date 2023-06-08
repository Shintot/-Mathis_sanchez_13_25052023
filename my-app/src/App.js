import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import SignInPage from "./SignInPage";
import User from "./User";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/api/v1/user/login" element={<SignInPage/>}/>
                 <Route path="/user" element={<User/>}/>

            </Routes>
        </Router>
    );
}

export default App;
