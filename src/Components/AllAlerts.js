import React, { Component } from 'react'
import {Row,Col,Container} from 'reactstrap';
import {ListGroup,ListGroupItem} from 'react-bootstrap'
import {Skeleton} from 'antd';
import { axiosInstance } from '../axiosInterceptor';
import './log.css';

export default class AllAlerts extends Component {
    constructor(props){
        super(props);
        this.state={
            alertData:null,
            loading:false,
        }
    }
    componentDidMount(){
        this.setState({
            ...this.state,loading:true,
        });
        axiosInstance.get('/alert/allNotifications').then((res)=>{
            console.log(res.data);
            this.setState({
                ...this.state,loading:false,alertData:res.data
            });
        })
        .catch((err)=>{
            this.setState({
                ...this.state,loading:false,
            });
        })
    }
    render() {
        return (
            <Container className="alert_wrapper">
                <Row>
                      <h3>Weather Alerts</h3>
                </Row>
                <Row>
                    {
                        (this.state.loading)?(<Skeleton></Skeleton>):(
                            (this.state.alertData)?(
                                this.state.alertData.slice(0).reverse().map((alert)=>{
                                    let date=alert.forDate.toString().split('T')[0];
                                    let time=alert.forDate.toString().split('T')[1].split('.')[0];
                                    return (
                                        <Col md={4} sm={6} style={{marginBottom:'20px'}}>
                                            <div className={`alert_card_wrapper ${alert.severity}`}>
                                                <div className="message">
                                                    {alert.message}
                                                </div>
                                                <div className="loc">
                                                    LAT : {alert.location.lat} | LONG : {alert.location.lon}
                                                </div>
                                                <div className={`low ${alert.severity}`}>Severity : {alert.severity}</div>
                                                <div className="for_date">Date : {date} | Time : {time}</div>
                                                <div className="created_by">Creator : {alert.creator.username}</div>
                                            </div>
                                        </Col>
                                    )   
                                })
                            ):('')
                        )
                    }
                </Row>
               
            </Container>
        )
    }
}
