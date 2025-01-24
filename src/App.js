import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import {Provider} from 'react-redux'
import store from './store';

import Inbox from './pages/Inbox';
import Trash from './pages/Trash';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';
import TrashEmailList from './components/TrashEmailList';
import TrashEmailDetail from './components/TrashEmailDetail';
import SentEmailList from './components/sentComponents/SentEmailList';
import SentEmailDetail from './components/sentComponents/SentEmailDetail';
import DraftEmailList from './components/DraftComponents/DraftEmailList';
import DraftEmailDetail from './components/DraftComponents/DraftEmailDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { io } from 'socket.io-client';

function App() {
  


  const location = useLocation();

// Paths without layout
const noLayoutPaths = ["/login", "/register"];

const shouldRenderLayout = !noLayoutPaths.includes(location.pathname);

  return (
  <Provider store={store}>
   {/* <Routes>
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
    element={<SingleEmailViewComponent />}
    />
   </Routes> */}

<Routes>
      {/* Routes without Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes with Layout */}
      {shouldRenderLayout ? (
        <Route
          path="*"
          element={
            <Homepage>
              <Routes>

                <Route path="/inbox" >
                  <Route index  element={
                    <ProtectedRoute>
                    <EmailList />
                    </ProtectedRoute>
                    }
                     />
                  <Route path=":email_id" element={
                     <ProtectedRoute>
                    <EmailDetail />
                    </ProtectedRoute>
                    } />
                </Route>
                <Route path="/trash" >
                  <Route index  element={
                    <ProtectedRoute>
                    <TrashEmailList />
                    </ProtectedRoute>
                  } />
                  <Route path=":email_id" element={
                    <ProtectedRoute>
                    <TrashEmailDetail />
                    </ProtectedRoute>
                    } />
                </Route>
                <Route path="/sent" >
                  <Route index  element={
                    <ProtectedRoute>
                    <SentEmailList />
                    </ProtectedRoute>
                    } />
                  <Route path=":email_id" element={
                    <ProtectedRoute>
                    <SentEmailDetail />
                    </ProtectedRoute>
                    } />
                </Route>
                <Route path="/draft" >
                  <Route index  element={
                    <ProtectedRoute>
                    <DraftEmailList />
                    </ProtectedRoute>
                    } />
                  <Route path=":email_id" element={
                    <ProtectedRoute>
                    <DraftEmailDetail />
                    </ProtectedRoute>
                    } />
                </Route>
                <Route path="*" element={<Navigate to="/inbox" />} />
              </Routes>
            </Homepage>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
   
   </Provider>
  );
}

export default App;
