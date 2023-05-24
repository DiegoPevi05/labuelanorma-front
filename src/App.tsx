import {Suspense} from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import RecoverPassword from './pages/Recover-password';
import ValidatePassword from './pages/Validate-Code-Password';
import ResetPassword from './pages/Reset-password';
import MainStore from './pages/Store';
import MainStoreProduct from './pages/Store-Product';
import Giveaway from './pages/Giveaways';
import Checkout from './pages/Store-Checkout';
import LoadingComponent from './components/shared/LoadingComponent';
import Providers from './components/Providers';


function App() {
  return(
    <Suspense fallback={<LoadingComponent isLoading={true}/>}>
      <Providers>
          <Router>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/register' element={<Register />} />
              <Route path='/recover-password' element={<RecoverPassword />} />
              <Route path='/validate-code-password' element={<ValidatePassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/store' element={<MainStore/>}/>
              <Route path='/store/product/:id' element={<MainStoreProduct/>}/>
              <Route path='/store/checkout' element={<Checkout/>}/>
              <Route path='/giveaways' element={<Giveaway/>}/>
            </Routes>
          </Router>
      </Providers>
    </Suspense>
  ) 
}

export default App
