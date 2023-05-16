import {Suspense} from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Providers from './components/Providers';
import './lib/i18n';



function App() {
  return(
    <Suspense fallback='loading'>
      <Providers>
          <Router>
            <Routes>
              <Route path='/' element={<Home/>} />
            </Routes>
          </Router>
      </Providers>
    </Suspense>
  ) 
}

export default App
