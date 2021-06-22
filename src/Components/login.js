import React, { Component } from "react";
import { Input, Button, FormGroup, Form, Label } from "reactstrap";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./unlog.css";
import axios from "axios";
import { axiosInstance } from "../axiosInterceptor";
import {message} from 'antd';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      passsword: "",
      alertMessage: "",
      loading:false
    };
   
  }
  
  render() {
    return (
      <>
        <div className="login_wrapper">
          <h3>Login</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(this.state);
              if (this.state.username == "" || this.state.passsword == "") {
                this.setState(
                  {
                    ...this.state,
                    alertMessage: "Please provide username and password!",
                  },
                  () => {
                    message.warn(this.state.alertMessage);
                  }
                );
              }
              else{
                this.setState({
                    ...this.state,
                    loading: true,
                  });
                  axios.post('http://localhost:3000/users/login',{username:this.state.username,password:this.state.passsword}).then(res=>{
                    this.setState({
                        ...this.state,
                        loading: false,
                      });
                      const newToken = res.data.token;
                      axiosInstance.interceptors.request.use((config) => {
                        const auth = `Bearer ${newToken}`;
                    
                        config.headers.Authorization = `Bearer ${newToken}`;
                        return config;
                      });
                      localStorage.setItem("token", newToken);
                      message.success('Successfully Logged In')
                      this.props.toogelLoggedIn();
                  })
                  .catch(err=>{
                    this.setState({
                        ...this.state,
                        loading: false,
                      });
                      if(err.response){
                        message.warn(err.response.data.err.message);
                        console.log(err.response.data.err.message);
                      }
                      console.log(err);
                      
                  })
              }
            }}
          >
            <FormGroup>
              <Input
                onChange={(e) => {
                  this.setState({ ...this.state, username: e.target.value });
                }}
                placeholder="Username"
                id="username"
                type="username"
                name="username"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Input
                onChange={(e) => {
                  this.setState({ ...this.state, passsword: e.target.value });
                }}
                placeholder="Password"
                type="password"
                name="password"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button type="submit" >{(!this.state.loading)?('Login'):(<Spinner animation="border" variant="light" />)} </Button>
            </FormGroup>
          </Form>

          <div className="not_logged">
              
            Not Logged in?{" "}
            <Link to="/signup">
              <u>SignUp</u>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
