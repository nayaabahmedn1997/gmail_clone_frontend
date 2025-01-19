import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import {Provider} from 'react-redux'
import store from './store';
import EmailPage from './pages/EmailPage';
import SingleEmail from './components/SingleEmail';


function App() {
  return (
  <Provider store={store}>
   <Routes>
    <Route
    path='/' exact
    element={<Homepage />}
    />
     <Route
    path='/register' exact
    element={<RegisterPage />}
    />
     <Route
    path='/login' exact
    element={<LoginPage />}
    />
    <Route 
    path='/inbox/:email_id'
    element={<SingleEmail />}
    />
   </Routes>
   </Provider>
  );
}

export default App;
