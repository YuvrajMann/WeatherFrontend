import React, { Component } from 'react'
import {Input,Button,FormGroup,Form,Label} from 'reactstrap';
import { Spinner } from "react-bootstrap";
import {Link} from 'react-router-dom';
import './unlog.css';
import {axiosInstance} from '../axiosInterceptor';
import { message } from 'antd';
export default class signUp extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            firstname:"",
            lastname:"",
            loading:false,
        }
    }
    render() {
        return (
            <div className="signup_wrapper">
                <h3>Sign Up</h3>
                <Form onSubmit={(e)=>{
                      e.preventDefault();
                    if(this.state.username==""||this.state.password==""||this.state.firstname==""){
                        message.warn('Firstname,lastname,password are mandatory!')
                    }
                    else{
                        this.setState({
                            ...this.state,loading:true,
                        })
                        axiosInstance.post('/users/signup',{username:this.state.username,password:this.state.password,firstname:this.state.firstname,lastname:this.state.lastname}).then((res)=>{
                            this.setState({
                                ...this.state,loading:false,
                            },()=>{
                                this.props.history.push('/');
                                message.success('Successfully signed up');
                            })
                        })
                        .catch((err)=>{
                            this.setState({
                                ...this.state,loading:false,
                            },()=>{
                               
                                message.success('Not able to sign up with info provided');
                            })
                        })
                    }
                  
                  
                }}>
                    <FormGroup>
                    <Input onChange={(e)=>{
                        this.setState({...this.state,username:e.target.value});
                    }} placeholder="Username" id="username" type="username" name="username"></Input>
                    </FormGroup>
                   <FormGroup>
                   <Input onChange={(e)=>{
                        this.setState({...this.state,password:e.target.value});
                    }} placeholder="Password" type="password" name="password"></Input>
                   </FormGroup>
                   <FormGroup>
                   <Input placeholder="FirstName" onChange={(e)=>{
                        this.setState({...this.state,firstname:e.target.value});
                    }} type="firstname" name="firstname"></Input>
                   </FormGroup> 
                   <FormGroup>
                   <Input placeholder="LastName" onChange={(e)=>{
                        this.setState({...this.state,lastname:e.target.value});
                    }} type="lastname" name="lastname"></Input>
                   </FormGroup>
                   <FormGroup>
                   <Button type="submit">{(this.state.loading)?(<Spinner animation="border" variant="light" />):('Create Account')}</Button>
                   </FormGroup>
                  
                </Form>
                <div className="not_logged">Already Have an account? <Link to="/"><u>Login</u></Link></div>
            </div>
        )
    }
}
