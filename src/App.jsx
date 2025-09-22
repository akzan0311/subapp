import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";
import DetailPage from "./pages/DetailPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";


const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  
  // console.log({onlineUsers})

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser)
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  return (
    <div data-theme={theme}>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element= {<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/admin" element= {<AdminPage />} />



        <Route path="/signup" element={!authUser?<SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!authUser?<LoginPage />: <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} /> 
        <Route path="/profile" element={authUser?<ProfilePage />: <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
