import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("authUser"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });
    } else {
      alert("Invalid credentials");
    }
  };

  const signup = (email, password) => {
    localStorage.setItem("authUser", JSON.stringify({ email, password }));
    alert("Signup successful");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Login login={login} />} />
            <Route path="/signup" element={<Signup signup={signup} />} />
          </>
        ) : (
          <Route
            path="/"
            element={<Dashboard logout={logout} />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
