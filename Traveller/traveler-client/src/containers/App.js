import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import {configureStore} from '../store';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from 'jwt-decode';

const store = configureStore();
if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    try{
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
    } catch (e){
        store.dispatch(setCurrentUser({}))
    }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
              <div>
                <Navbar/>
                <Main/>
              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;
