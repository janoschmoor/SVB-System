import AuthProvider from './contexts/AuthContext';
import {
  Route,
  BrowserRouter,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from 'react';
import SystemProvider from './contexts/systemContext';

const HomePage = lazy(() => import('./pages/Home'));
const LoadingPage = lazy(() => import('./pages/Loading'));
const TestingGroundPage = lazy(() => import('./pages/Admin/TestingGround'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Admin = lazy(() => import('./pages/Admin'));
const UsersPage = lazy(() => import('./pages/Admin/Users'));
const ProfilePage = lazy(() => import('./pages/Profile'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/users",
    element: <UsersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/testing_ground",
    element: <TestingGroundPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profil",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/loadingpage",
    element: <LoadingPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {

  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthProvider>
        <SystemProvider>

          <RouterProvider router={router} />

        </SystemProvider>
      </AuthProvider>
    </Suspense>
  )
}

export default App;
