import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";

// Import components
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

// Import pages
import Home from "./pages/Home";
import AllCrops from "./pages/AllCrops";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import CropDetails from "./pages/CropDetails";
import AddCrop from "./pages/AddCrop";
import MyPosts from "./pages/MyPosts";
import MyInterests from "./pages/MyInterests";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar & Footer */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/all-crops"
            element={
              <>
                <Navbar />
                <AllCrops />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />

          {/* Private Routes with Navbar & Footer */}
          <Route
            path="/crop/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <CropDetails />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/add-crop"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddCrop />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/my-posts"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <MyPosts />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/my-interests"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <MyInterests />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          {/* 404 Page - No Navbar/Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
