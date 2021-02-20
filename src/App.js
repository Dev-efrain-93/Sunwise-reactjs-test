import React,  {Component} from 'react';
import logo from './assets/images/spotify-black.svg';
import './App.css';
import config  from './config';
import hash from './hash';
import * as $ from "jquery";
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';

class App extends Component {

  constructor() {
    super();

    let tokenSaved = localStorage.getItem("token");

    this.state = {
      token: tokenSaved || null
    };

  }     
    
  /**
   * Se obtiene el token de acceso y se almancena para las peticiones posteriores
   */
  componentDidMount() { 

    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token
      });
      localStorage.setItem("token", _token);
    }  
  }
  
  
  render() {
    return (
      <div className="main">
          {!this.state.token && (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />            
                  <a
                      className="btn btn--loginApp-link"
                      href={`${config.api.authUrl}?client_id=${config.api.clientId}&redirect_uri=${config.api.redirectUri}&scope=${config.api.scopes.join(
                      "%20"
                      )}&response_type=token&show_dialog=true`}
                  >
                      Login Spotify
                  </a>
              </header>
          </div>
          )}
          {this.state.token && (
              <CoreLayout>
                  <Routes />
              </CoreLayout>
          )} 
      </div>       
    );
  }
}
  
export default App;