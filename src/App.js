
import './App.css';
import Login from './components/login';
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import AuthProvider from './Context';
import AppProvider from './Context/AppProvider';
import AddRoom from './components/Modals/AddRoom';
import InviteMember from './components/Modals/InviteMember';
import Home from './components/main-component';
import FriendList from './components/friends-component/index';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path='/login' />
            <Route component={Home} path="/home" />
          </Switch>
          <AddRoom/>
          <InviteMember/>
          <FriendList/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
