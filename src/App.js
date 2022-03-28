import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  Error,
  About,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  Private,
  AuthWrapper,
} from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route
            exact
            path='/checkout'
            element={
              <Private>
                <Checkout />
              </Private>
            }
          />
          <Route path='error' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
