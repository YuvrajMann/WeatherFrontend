import { message } from "antd";
import React, { Component } from "react";
import { Button, Input, Form, Label, FormGroup, Col } from "reactstrap";
import { Spinner } from "react-bootstrap";
import "./log.css";
import { axiosInstance } from "../axiosInterceptor";
import WeatherCard from './weather';
import {Link} from 'react-router-dom';
import ChartComponent from './chartComponent';
export default class MainDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seacrch_opt: "cityname",
      zipCode:"",
      cityName:"",
      stateCode:"",
      countryCode:"",
      lat:"",
      long:"",
      loading:false,
      weatherData:null,
      chartData:null,
    };
    this.fetchWeather=this.fetchWeather.bind(this);
  }
  fetchWeather(){
    if(this.state.seacrch_opt=="zipcode"){
      if(this.state.zipCode==""||this.state.countryCode==""){
        
        message.warn('Please provide the zipcode and the country code');
      }
      else{
        this.setState({...this.state,loading:true});
        axiosInstance.post(`/weather/getByZipCode`,{zipCode:this.state.zipCode,countryCode:this.state.countryCode}).then(res1=>{
          axiosInstance.post(`/weather/getByZipCode/forecast`,{zipCode:this.state.zipCode,countryCode:this.state.countryCode}).then(res2=>{
              this.setState({...this.state,loading:false,weatherData:res1.data,chartData:res2.data});  
          })
         
        })
        .catch((err)=>{
          this.setState({...this.state,loading:false});
          if(err.response){
            console.log(err.response);
          }
        })
      }
    }
    else if(this.state.seacrch_opt=="cityname"){
      if(this.state.cityName==""){
        message.warn('Please provide the cityname');
      }
      else{
        this.setState({...this.state,loading:true});
        axiosInstance.post(`/weather/getByCity`,{cityName:this.state.cityName,stateCode:this.state.stateCode,countryCode:this.state.countryCode}).then(res1=>{
          axiosInstance.post(`/weather/getByCity/forecast`,{cityName:this.state.cityName,stateCode:this.state.stateCode,countryCode:this.state.countryCode}).then(res2=>{
            this.setState({...this.state,loading:false,weatherData:res1.data,chartData:res2.data});           
          })
        })
        .catch((err)=>{
          this.setState({...this.state,loading:false});
          if(err.response){
            console.log(err.response);
          }
        })
      }
    }
    else if(this.state.seacrch_opt=="coordinates"){
      if(this.state.lat==""||this.state.long==""){
        message.warn('Please provide the latitude and longitude');
      }
      else{
        this.setState({...this.state,loading:true});
        axiosInstance.post(`/weather/getByCord`,{lat:this.state.lat,long:this.state.long}).then(res1=>{
          axiosInstance.post(`/weather/getByCord/forecast`,{lat:this.state.lat,long:this.state.long}).then(res2=>{
            this.setState({...this.state,loading:false,weatherData:res1.data,chartData:res2.data});  
          })
        })
        .catch((err)=>{
          this.setState({...this.state,loading:false});
          if(err.response){
            console.log(err.response);
          }
        })
      }
    }
  }
  render() {
    return (
      <div>
        <div className="header">
          <div>Weather Alerter</div>
          <div>
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
          
            <Button color="primary" onClick={()=>{this.props.toogelLoggedIn(); delete localStorage.token}}>LogOut</Button>
          </div>
        </div>
        <div className="content">
          <h3>Get Weather</h3>
          <Form onSubmit={(e)=>{e.preventDefault();this.fetchWeather()}}>
            <FormGroup row>
              <Label for="select_opt" sm={1}>
                Search By
              </Label>
              <Col sm={11}>
                <Input
                  type="select"
                  id="select_opt"
                  placeholder="Select Search Option"
                  onChange={(e) => {
                    console.log(e.target.value);
                    this.setState({
                      ...this.state,
                      seacrch_opt: e.target.value,
                    });
                  }}
                >
                  <option value="cityname">City Name</option>
                  <option value="coordinates">Coordinates</option>
                  <option value="zipcode">Zip Code</option>
                </Input>
              </Col>
            </FormGroup>
            {this.state.seacrch_opt == "cityname" ? (
              <FormGroup>
                <Input type="text" placeholder="Enter City Name" style={{marginRight:"10px"}} onChange={(e)=>{this.setState({...this.state,cityName:e.target.value})}}></Input>
                <Input type="text" placeholder="Enter State Code" style={{marginRight:"10px"}} onChange={(e)=>{this.setState({...this.state,stateCode:e.target.value})}}></Input>
                <Input type="text" placeholder="Enter Country Code" onChange={(e)=>{this.setState({...this.state,countryCode:e.target.value})}}></Input>
              </FormGroup>
            ) : this.state.seacrch_opt == "coordinates" ? (
              <FormGroup>
                <Input type="text" placeholder="Enter Latitude" style={{marginRight:"10px"}} onChange={(e)=>{this.setState({...this.state,lat:e.target.value})}}></Input>
                <Input type="text" placeholder="Enter Longitude" onChange={(e)=>{this.setState({...this.state,long:e.target.value})}}></Input>
              </FormGroup>
            ) : (
              <FormGroup>
                <Input type="text" placeholder="Enter Zip Code" style={{marginRight:"10px"}} onChange={(e)=>{this.setState({...this.state,zipCode:e.target.value})}}></Input>
                <Input type="text" placeholder="Enter Country Code"  onChange={(e)=>{this.setState({...this.state,countryCode:e.target.value})}}></Input>
              </FormGroup>
            )}

            <FormGroup>
              <Button color="success" outline type="submit">Get Weather</Button>
            </FormGroup>
          </Form>
        </div>
        <div className="weather_data_wrapper">
          {this.state.loading?(<Spinner animation="border" variant="dark" />):((this.state.weatherData)?(<><WeatherCard weatherData={this.state.weatherData}></WeatherCard>
          <ChartComponent chartData={this.state.chartData}></ChartComponent></>):(<></>))}
        </div>
      
      </div>
    );
  }
}
