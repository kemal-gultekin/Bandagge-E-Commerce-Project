import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import CartPage from '../pages/CartPage';
import ContactPage from '../pages/ContactPage';
import TeamPage from '../pages/TeamPage';
import AboutPage from '../pages/AboutPage';
import ProductPage from '../pages/ProductPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import CreateOrderPage from '../pages/CreateOrderPage';
import PreviousOrdersPage from '../pages/PreviousOrdersPage';
import ProtectedRoute from '../components/ProtectedRoute';
import BlogPage from '../pages/BlogPage';

const PageContent = () => {
  return (
    <main className="flex-grow">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/cart" component={CartPage} />
        <ProtectedRoute exact path="/checkout" component={CreateOrderPage} />
        <ProtectedRoute exact path="/previous-orders" component={PreviousOrdersPage} />
        <ProtectedRoute exact path="/orders" component={PreviousOrdersPage} />
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductPage} />
        <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </main>
  );
};

export default PageContent;
