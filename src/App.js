import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Schedule from "./pages/Schedule";
import Videos from "./pages/Videos";
import Leaderboard from "./pages/Leaderboard";
import Hero from "./components/hero";
import SimpleSlider from "./components/swiper/Carousel";
import EventInfo from "./components/eventInfo/index";
import RsvpForm from "./components/RSVP";
import RSVPCount from "./components/response";




function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Hero />
        <EventInfo />
        <SimpleSlider />
        <RsvpForm />
        <RSVPCount />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/videos" component={Videos} />
          <Route path="/leaderboard" component={Leaderboard} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
