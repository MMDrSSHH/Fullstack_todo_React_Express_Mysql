import { Routes, Route } from "react-router-dom";
import Login from "./pages/login_page/Login";
import Notfound from "./pages/notfound_page/Notfound";
import Signing from "./pages/signin_page/Signing";
import "react-toastify/dist/ReactToastify.min.css";
import Home from "./pages/home_page/Home";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signing />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
