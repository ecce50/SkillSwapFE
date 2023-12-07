import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import IsPrivate from "./components/auth/isPrivate";
import SearchResults from "./pages/SearchResults";
import ErrorBoundary from "./components/auth/ErrorBoundary";
import SkillDetailPage from "./pages/SkillDetailPage";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/skill-detail" element={<SkillDetailPage />} />
          <Route path="/search-results" element={<SearchResults />} />{" "}
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <Profile />
              </IsPrivate>
            }
          />
          <Route path="*" element={<h1>404 page</h1>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
