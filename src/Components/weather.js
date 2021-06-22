import React, { Component } from 'react'
import './log.css';

export default class weather extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props);
        let temp=this.props.weatherData.main.temp-273.15;
        temp=temp.toPrecision(4)
        return (
            <div className="weather_card_wrapper">
                <div className="loc_name">
                    {this.props.weatherData.name},{this.props.weatherData.sys.country}
                </div>
                <div className="cord">
                    LAT {this.props.weatherData.coord.lat} | LONG {this.props.weatherData.coord.lon}
                </div>
                <div className="temp">
                  <img src={`http://openweathermap.org/img/wn/${this.props.weatherData.weather[0].icon}@2x.png`}></img>  {temp} deg C
                </div>
                <div className="remarks">
                    Feels Like {this.props.weatherData.main.feels_like} | {this.props.weatherData.weather[0].description}
                </div>
                <div className="wind_speed">
                    Wind - {this.props.weatherData.wind.speed} m/s W
                </div>
                <div className="visibility">
                     Visibility - {this.props.weatherData.visibility} m
                </div>
            </div>
        )
    }
}
