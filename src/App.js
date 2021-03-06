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
import PrivateRoute from './Pages/AuthenticationPage/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/DashBoard/Dashboard/Dashboard';
import DashboardHome from './Pages/DashBoard/DashboardHome/DashboardHome';
import AdminRoute from './Pages/AuthenticationPage/AdminRoute/AdminRoute';
import AddProducts from './Pages/DashBoard/Admin/AddProducts/AddProducts';
import MyCart from './Pages/DashBoard/G_User/MyCart/MyCart';
import MyWishLists from './Pages/DashBoard/G_User/MyWishLists/MyWishLists';
import MyOrder from './Pages/DashBoard/G_User/MyOrder/MyOrder';
import Payment from './Pages/DashBoard/G_User/Payment/Payment'; 
import MyAccount from './Pages/DashBoard/G_User/MyAccount/MyAccount';
import AuthProvider from './Context/AuthProvider';
import ProductsProvider from './Context/ProductsProvider';
import NotFound from './NotFound/NotFound';
import ManageAdmin from './Pages/DashBoard/Admin/ManageAdmin/ManageAdmin';
import GiveReviews from './Pages/DashBoard/G_User/GiveReviews/GiveReviews';
import ManageOrders from './Pages/DashBoard/Admin/ManageOrders/ManageOrders';
import SuperAdminRoute from './Pages/AuthenticationPage/SuperAdminRoute/SuperAdminRoute';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ProductsProvider>
            <Routes>
              <Route path="/about" element={<PrivateRoute><AboutPage /></PrivateRoute>}>
              </Route> 
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route exact path="/dashboard" element={<DashboardHome></DashboardHome>}></Route>
                <Route exact path="/dashboard/myCarts" element={<MyCart></MyCart>}></Route>
                <Route exact path="/dashboard/myWishlists" element={<MyWishLists></MyWishLists>}></Route>
                <Route exact path="/dashboard/myPayments" element={<Payment></Payment>}></Route>
                <Route exact path="/dashboard/myOrders" element={<MyOrder></MyOrder>}></Route>
                <Route exact path="/dashboard/myAccount" element={<MyAccount></MyAccount>}></Route>
                <Route exact path="/dashboard/giveReviews" element={<GiveReviews></GiveReviews>}></Route>
                <Route path={`/dashboard/manageOrder`} element={<AdminRoute> <ManageOrders></ManageOrders> </AdminRoute>}></Route>
                <Route path={`/dashboard/admins`} element={<SuperAdminRoute><ManageAdmin></ManageAdmin> </SuperAdminRoute>}></Route>
                <Route path={`/dashboard/addProducts`} element={<AdminRoute><AddProducts></AddProducts></AdminRoute>}>
                </Route>
              </Route>


              <Route path="/home" element={<HomePage />}>
              </Route>
              <Route path="/explore" element={<ExplorePage />}>
              </Route>
              <Route path="/product/:id" element={<SingleProductDetails />}>
              </Route>
              <Route path="/signIn" element={<SignIn />}>
              </Route>
              <Route path="/signUp" element={<SignUp />}>
              </Route>
              <Route exact path="/" element={<HomePage />}>
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer></Footer>
          </ProductsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
