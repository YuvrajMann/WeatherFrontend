import React, { Component } from 'react'
import { Form,FormGroup,Input,Button,Label } from 'reactstrap'
import './log.css';
import { axiosInstance } from '../axiosInterceptor';
import {message} from 'antd';
export default class createAlert extends Component {
    constructor(props){
        super(props);
        this.state={
            latitude:"",
            longitude:"",
            severity:"low",
            date:"",
            time:"00:00",
            message:"",
            loading:false,
        }
        this.handleForm=this.handleForm.bind(this);
    }
    handleForm(){
        if(this.state.latitude==""||this.state.longitude==""||this.state.severity==""||this.state.date==""||this.state.message==""){
            message.warn('Please provide all the fields');
        }
        else{
            this.setState({...this.state,loading:true});
            let forDate=`${this.state.date}T${this.state.time}:00.000Z`;
            axiosInstance.post('/alert/raise',{
                location:{
                    lon: this.state.longitude,
                    lat: this.state.latitude
                },
                message:this.state.message,
                severity:this.state.severity,
                forDate:forDate
            }).then(res=>{
                message.success('Alert created successfully');
                this.setState({...this.state,loading:false});
            })
            .catch((err)=>{
                console.log(err);
                message.warn('Not able to create Notification');
                this.setState({...this.state,loading:false});
            })
        }
    }
    render() {
        return (
            <div className="alert_create_wrapper">
                <h3>Create an Alert</h3>
                <Form onSubmit={(e)=>{e.preventDefault();this.handleForm()}}>
                    <FormGroup>
                    <Label>Latitude of location</Label>
                        <Input type="text" placeholder="Latitude"  onChange={(e) => {
                                
                                this.setState({
                                ...this.state,
                                latitude: e.target.value,
                                });
                  }}></Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Longitude of location</Label>
                        <Input type="text" placeholder="Longitude" onChange={(e) => {
                                
                                this.setState({
                                ...this.state,
                                longitude: e.target.value,
                                });
                  }}></Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Select Severity</Label>
                        <Input type="select" onChange={(e) => {
                                
                                this.setState({
                                ...this.state,
                                severity: e.target.value,
                                });
                  }}>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Choose Date</Label>
                        <Input type="date" onChange={(e) => {
                                
                                this.setState({
                                ...this.state,
                                date: e.target.value,
                                });
                  }}></Input>
                        
                    </FormGroup>
                    <FormGroup>
                        <Label>Choose Time</Label>
                    <Input type="time" onChange={(e) => {
                                
                                this.setState({
                                ...this.state,
                                time: e.target.value,
                                });
                  }}></Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Enter Alert Message</Label>
                        <Input type="textarea" placeholder="Message" onChange={(e) => {
                                
                                this.setState({
                                ...this.state,
                                message: e.target.value,
                                });
                  }}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Create Alert</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
