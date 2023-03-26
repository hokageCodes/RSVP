import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import UploadForm from "./components/uploadVideo";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/uploadvideo" element={<UploadForm />} />
        <Route path="/takequiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
