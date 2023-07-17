import ReactDOM from 'react-dom';
import 'normalize.css';
import './defaults.css';
import Shop from './Shop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MuiBottomNavigation from './MuiBottomNavigation';

//this is good

ReactDOM.render(
  <Router>

    <Routes>
      <Route path="/Shop" element={<Shop/>} />
    </Routes>

    <MuiBottomNavigation />

  </Router>,
  document.getElementById('root')
);