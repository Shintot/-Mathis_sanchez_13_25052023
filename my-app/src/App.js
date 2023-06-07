import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import SignInPage from "./SignInPage";
import User from "./User";

// Importez les autres composants de pages dont vous avez besoin

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/api/v1/user/login" element={<SignInPage/>}/>
                 <Route path="/user" element={<User/>}/>
                {/* Ajoutez d'autres routes pour vos autres pages */}
            </Routes>
        </Router>
    );
}

export default App;
