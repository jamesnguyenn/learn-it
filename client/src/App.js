import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./Components/routing/ProtectedRoute";
import NavbarMenu from "./Components/layout/NavbarMenu";
import About from "./views/About";
import PostsContextProvider from "./contexts/PostsContext";
import Footer from "./Components/layout/Footer";
function App() {
  return (
    <AuthContextProvider>
      <PostsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <NavbarMenu />
                  <About />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </PostsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
