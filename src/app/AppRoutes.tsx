import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        // element: <MainPage />,
      },
      {
        path: '/catalog',
        // element: <CatalogPage />,
      },
      {
        path: '/about',
        // element: <AboutPage />,
      },
      {
        path: '/contacts',
        // element: <ContactsPage />,
      },
      {
        path: '/catalog/:id',
        // element: <ProductPage />,
      },
      {
        path: '/cart',
        // element: <CartPage />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
