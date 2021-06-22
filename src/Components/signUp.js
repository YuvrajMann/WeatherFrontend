import React, { Component } from 'react'
import {Input,Button,FormGroup,Form,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import './unlog.css';

export default class signUp extends Component {
    render() {
        return (
            <div className="signup_wrapper">
                <h3>Sign Up</h3>
                <Form>
                    <FormGroup>
                    <Input placeholder="Username" id="username" type="username" name="username"></Input>
                    </FormGroup>
                   <FormGroup>
                   <Input placeholder="Password" type="password" name="password"></Input>
                   </FormGroup>
                   <FormGroup>
                   <Input placeholder="FirstName" type="firstname" name="firstname"></Input>
                   </FormGroup>
                   <FormGroup>
                   <Input placeholder="LastName" type="lastname" name="lastname"></Input>
                   </FormGroup>
                   <FormGroup>
                   <Button type="submit">Creat Account</Button>
                   </FormGroup>
                  
                </Form>
                <div className="not_logged">Already Have an account? <Link to="/"><u>Login</u></Link></div>
            </div>
        )
    }
}
