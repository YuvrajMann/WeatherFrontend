import "./App.css";
import React, { Component } from "react";
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import Login from './Components/login';
import SignUp from './Components/signUp';
import CreateAlert from './Components/createAlert';
import AllAlerts from './Components/AllAlerts';
import MainDashboard from './Components/MainDashBoard';
import { axiosInstance } from "./axiosInterceptor";
import { Button, Input, Form, Label, FormGroup, Col } from "reactstrap";
import {Link} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.toogelLoggedIn=this.toogelLoggedIn.bind(this);
  }
  toogelLoggedIn(){
    this.setState({
      ...this.state,loggedIn:!this.state.loggedIn
    });
  }
  componentDidMount(){
    let token=localStorage.getItem('token');
    if(token){
      axiosInstance.interceptors.request.use((config) => {    
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      this.setState({
        ...this.state,loggedIn:true
      });
    }
    else{
      this.setState({
        ...this.state,loggedIn:false
      });
    }
  }
  render() {
      return (
      <Router>
       { this.state.loggedIn ? (
         <>
          <div className="header">
          <div>Weather Alerter</div>
          <div>
          <Link to="/">
            <Button
              color="danger"
              style={{ marginRight: "20px" }}
            >
              Home
            </Button>
            </Link>
            <Link to="/createAlert">
            <Button
              color="danger"
              style={{ marginRight: "20px"}}
            >
              Create Alert
            </Button>
            </Link>
            <Link to="/alerts">
            <Button
              color="danger"
              style={{ marginRight: "20px" }}
            >
              Alerts
            </Button>
            </Link>
          
            <Button color="primary" onClick={()=>{this.toogelLoggedIn(); delete localStorage.token}}>LogOut</Button>
          </div>
        </div>
         <Switch>
           <Route path="/" exact history={this.props.history} render={(props)=>(
                <MainDashboard  history={props.history} toogelLoggedIn={this.toogelLoggedIn}></MainDashboard>
           )}></Route>
           <Route path="/createAlert" exact history={this.props.history} render={(props)=>(
              <CreateAlert history={props.history}></CreateAlert> 
           )}></Route>
            <Route path="/alerts" exact history={this.props.history} render={(props)=>(
              <AllAlerts history={props.history}></AllAlerts> 
           )}></Route>
         </Switch>
         </>
       
      ) : (
        <Switch>
          <Route path="/" exact history={this.props.history} render={(props)=>(
            <Login history={props.history} toogelLoggedIn={this.toogelLoggedIn}></Login>
          )}></Route>
           <Route path="/signup" exact history={this.props.history} render={(props)=>(
            <SignUp history={props.history} toogelLoggedIn={this.toogelLoggedIn}></SignUp>
          )}></Route>
        </Switch>
      )
      }
      </Router>
      )  
  }   
}

export default App;
