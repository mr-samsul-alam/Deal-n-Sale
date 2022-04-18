import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage/HomePage';
import Footer from './Pages/Shared/Footer/Footer';
import SignIn from './Pages/AuthenticationPage/SignIn/Signin';
import SignUp from './Pages/AuthenticationPage/SignUp/SignUp';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />}>
          </Route>
          <Route path="/signIn" element={<SignIn />}>
          </Route>
          <Route path="/signUp" element={<SignUp />}>
          </Route>
          <Route exact path="/" element={<HomePage />}>
          </Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
