
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import StatisticComponent from "./components/statistic.component";
import CatCardComponent from "./components/catCard.component";
import MainComponent from "./components/main.component";
import ProfileComponent from "./components/profile.component";
import SignInComponent from "./components/signIn.component";
import SignUpComponent from "./components/signUp.component";

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route exact path="/catCard" element={<CatCardComponent/>}/>
                  <Route exact path="/main" element={<MainComponent/>}/>
                  <Route exact path="/profile" element={<ProfileComponent/>}/>
                  <Route exact path="/sign_in" element={<SignInComponent/>}/>
                  <Route exact path="/sign_up" element={<SignUpComponent/>}/>
                  <Route exact path="/statistic" element={<StatisticComponent/>}/>
                  <Route path="*" element={<NoMatch/>}/>
              </Routes>
          </div>
      </Router>

  );
}
function Home() { return <div><h3>Home</h3></div> }
function About() { return <div><h3>About</h3></div> }
function NoMatch() { return <div><h3>No match!</h3></div> }
export default App;
