import React, { Component } from 'react'
import './log.css';

export default class WeatherTable extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props.chartData);
        return (
            <div className="table_wrapper">

                {(this.props.chartData)?this.props.chartData.list.map((data)=>{
                    return <div className="table_entry"><span className="date">{data.dt_txt}</span> <span><img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>{data.weather[0].description}</span> </div>
                }):('')}
            </div>
        )
    }
}
