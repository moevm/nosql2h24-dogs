

import { BrowserRouter as Router, Route, Routes,Navigate    } from 'react-router-dom'
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
                  <Route exact path="/cat_card" element={<CatCardComponent/>}/>
                  <Route exact path="/main" element={<MainComponent/>}/>
                  <Route exact path="/profile" element={<ProfileComponent/>}/>
                  <Route exact path="/sign_in" element={<SignInComponent/>}/>
                  <Route exact path="/sign_up" element={<SignUpComponent/>}/>
                  <Route exact path="/statistic" element={<StatisticComponent/>}/>
                  <Route path="*" element={<Navigate to="/sign_in" replace={true} />}/>
              </Routes>
          </div>
      </Router>

  );
}

function NoMatch() {
    return <div><h3>No match!</h3></div>
}
export default App;