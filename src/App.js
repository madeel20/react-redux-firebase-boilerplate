import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "./store";
import { Provider } from 'react-redux'

import './assets/scss/index.scss';
import CHeader from './components/CHeader/CHeader';
import LoginPage from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import CFooter from './components/CFooter/CFooter';
import { auth } from './firebase';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(false);
      }
    });
  }, []);

  if (user === null) { return null }


  return (

    <div className="App">

      <Provider store={store}>
        <Router>

          <CHeader />
          <Switch>

            <Route exact path="/" component={LoginPage} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword} />

          </Switch>
          <CFooter />

        </Router>
      </Provider>

    </div>

  );

}

export default App;
