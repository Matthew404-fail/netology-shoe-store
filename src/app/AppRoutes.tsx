import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Layout from '../components/Layout';
import React, { Suspense } from 'react';
import Preloader from '../components/Preloader/Preloader';

const MainPage = React.lazy(() => import('../pages/MainPage/MainPage'));
const CatalogPage = React.lazy(
  () => import('../pages/CatalogPage/CatalogPage')
);
const ProductPage = React.lazy(
  () => import('../pages/ProductPage/ProductPage')
);
const AboutPage = React.lazy(() => import('../pages/AboutPage/AboutPage'));
const ContactsPage = React.lazy(
  () => import('../pages/ContactsPage/ContactsPage')
);
const CartPage = React.lazy(() => import('../pages/CartPage/CartPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage isSearchFieldNeeded />,
      },
      {
        path: 'catalog/:id',
        element: (
          <Suspense fallback={<Preloader />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<Preloader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contacts',
        element: (
          <Suspense fallback={<Preloader />}>
            <ContactsPage />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Preloader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
