import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage/HomePage';
 
import SignIn from './Pages/AuthenticationPage/SignIn/Signin';
import SignUp from './Pages/AuthenticationPage/SignUp/SignUp';
import ExplorePage from './Pages/ExplorePage/ExplorePage/ExplorePage';
import SingleProductDetails from './Pages/ExplorePage/SingleProductDetails/SingleProductDetails';
import Footer from './Pages/Shared/Footer/Footer';
import AboutPage from './Pages/AboutPage/AboutPage/AboutPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />}>
          </Route>
          <Route path="/explore" element={<ExplorePage />}>
          </Route>
          <Route path="/about" element={<AboutPage />}>
          </Route>
          <Route path="/product/:id" element={<SingleProductDetails />}>
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
