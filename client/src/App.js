import "./App.css";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import User from "./pages/user";
import TimSheet from "./pages/timeSheet";
import Perfo from "./pages/performance";
import DailyActivities from "./pages/activites";
import Projects from "./pages/project";
import AddProjects from "./component/AddProject";

import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { auth } from "./component/Firebase/firebase";
import ProtectedRoute from "./component/ProtectedRoute";
import { ClipLoader } from "react-spinners";

function App() {
  const [user, setUser] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader />
      </div>
    );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Navigate to={"/user"} /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/user" element={<User />} />
          <Route path="/timesheet" element={<TimSheet />} />
          <Route path="/performance" element={<Perfo />} />
          <Route path="/activities" element={<DailyActivities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/AddProjects" element={<AddProjects />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
