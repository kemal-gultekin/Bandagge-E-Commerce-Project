import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken, fetchRoles } from './redux/actions/clientActions';
import { fetchCategories } from './redux/actions/productActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './layout/Header';
import Footer from './layout/Footer';
import PageContent from './layout/PageContent';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists and verify it
    dispatch(verifyToken());
    // Fetch roles if needed
    dispatch(fetchRoles());
    // Fetch categories
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-dark">
        <Header />
        <PageContent />
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}
