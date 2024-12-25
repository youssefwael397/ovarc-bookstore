import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';
import StoresPage from './pages/StoresPage';
import StoreInventoryPage from './pages/StoreInventoryPage';
import Layout from './components/Layout';
import ShopPageBooks from './pages/ShopBooks';
import ShopAuthors from './pages/ShopAuthors';
import ShopStores from './pages/ShopStores';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ShopPage />
            </Layout>
          }
        />
        <Route
          path="/shop/books"
          element={
            <Layout>
              <ShopPageBooks />
            </Layout>
          }
        />
        <Route
          path="/shop/authors"
          element={
            <Layout>
              <ShopAuthors />
            </Layout>
          }
        />
        <Route
          path="/shop/stores"
          element={
            <Layout>
              <ShopStores />
            </Layout>
          }
        />
        <Route
          path="/authors"
          element={
            <Layout>
              <AuthorsPage />
            </Layout>
          }
        />
        <Route
          path="/books"
          element={
            <Layout>
              <BooksPage />
            </Layout>
          }
        />
        <Route
          path="/stores"
          element={
            <Layout>
              <StoresPage />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <StoreInventoryPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
