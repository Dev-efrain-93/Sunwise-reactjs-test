import React,  {Component} from 'react';
import logo from './assets/images/spotify-black.svg';
import './App.css';
import config  from './config';
import hash from './hash';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { connect } from 'react-redux';
import { fetchUserInfo } from './actions/userActions';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

class App extends Component {
  
  constructor() {
    super();

    let tokenSaved = null;

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
    
    this.props.fetchUserInfo();
  }
  
  
  render() {
    let userInfo = this.props.userInfo ? this.props.userInfo : null;
    let themeSelected = this.props.theme ? this.props.theme : 'dark';

    return (
      <ThemeProvider theme={themeSelected == 'light' ? lightTheme : darkTheme}>
      <>
      <GlobalStyles/>
      <div className="main">
          {!userInfo.logeado && (
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
          {userInfo.logeado && (
              <CoreLayout>
                  <Routes />
              </CoreLayout>
          )} 
      </div>
      </>
      </ThemeProvider>             
    );
  }
}
  
//recuperar estado
const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
    theme: state.appReducer.theme
  }
}

//enviar acciones
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: () => dispatch(fetchUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);