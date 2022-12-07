import React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Profile from "./pages/Profile"
import Home from "./pages/Home"

import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <>
      <Router>
          <AuthProvider>
            <Routes>
            {/* <Switch> */}
              {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
              <PrivateRoute path="/profil" component={Profile} />
              <Route exact path="/" component={Home} />
            {/* </Switch> */}
            </Routes>
          </AuthProvider>
        </Router>
    </>
  )
}

export default App