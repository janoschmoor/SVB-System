import AuthProvider from './contexts/AuthContext';
import {
  Route,
  BrowserRouter,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
import LoadingPage from "./pages/Loading";
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
    path: "/profil",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {

  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthProvider>

        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
          </Routes>
        </BrowserRouter> */}
        <RouterProvider router={router} />

      </AuthProvider>
    </Suspense>
  )
}

export default App
