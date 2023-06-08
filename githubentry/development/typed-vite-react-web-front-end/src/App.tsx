import AuthProvider from './contexts/AuthContext';
import {
  Route,
  BrowserRouter,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from 'react';
import SystemProvider from './contexts/SystemContext';

const HomePage = lazy(() => import('./pages/Home'));
const LoadingPage = lazy(() => import('./pages/Loading'));
const TestingGroundPage = lazy(() => import('./pages/Admin/TestingGround'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Admin = lazy(() => import('./pages/Admin'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const InputDevPage = lazy(() => import('./pages/Admin/InputDev'));
const DataManagerPage = lazy(() => import('./pages/Admin/DataManager'));
const CourseCreatorPage = lazy(() => import('./pages/Admin/CourseCreator'));
const TestPage = lazy(() => import("./pages/Test"));

const router = createBrowserRouter([
  // {
  //   path: "/new/auth",
  //   element: <AuthPage />,
  //   errorElement: <ErrorPage />,
  // }
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
    // errorElement: <ErrorPage />,
  },
  {
    path: "/admin/inputdev",
    element: <InputDevPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/data-manager",
    element: <DataManagerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/course-creator",
    element: <CourseCreatorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
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
