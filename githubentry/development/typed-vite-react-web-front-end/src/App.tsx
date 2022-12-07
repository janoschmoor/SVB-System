import AuthProvider from './contexts/AuthContext';
import {
  Route,
  BrowserRouter,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Admin from './pages/Admin';
import UsersPage from './pages/Admin/Users';

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
]);

function App() {

  return (
    <AuthProvider>

      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />

    </AuthProvider>
  )
}

export default App
