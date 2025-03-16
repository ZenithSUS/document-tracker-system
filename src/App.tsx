import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import MainLayout from "./components/layouts/main-layout";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const queryProvider = new QueryClient();

  return (
    <QueryClientProvider client={queryProvider}>
      <Router>
        <Routes>
          <Route path="*" element={<h1>Not Found</h1>} />

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/indox" element={<h1>Inbox </h1>} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/search" element={<h1>Search</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <ToastContainer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
