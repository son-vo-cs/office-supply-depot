import React, {Component} from 'react';
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './DriverPage.css'
import GoogleMap from "./GoogleMap/GoogleMap";
import userService from "../../common/services/User/UserService";
import UserStoreService from "../../common/services/User/UserStoreService";

class DriverPage extends Component {


    state = {
        clicked: false,
        start: true,

        addresses: [],
        open: false,
        driverOrderIds: [],
    };

    componentDidMount() {

        let body = {
            authorization: UserStoreService.getToken(),
        };

        let address = "";
        let addresses = [];
        let driverOrderId = "";
        let driverOrderIds = [];
        userService.getShipAddress(JSON.stringify(body)).then((data) => {

            console.log(data,"data");
            for (let i = 0; i < data.length; i++){
                address = data[i].shipaddress;
                addresses.push(address);
                driverOrderId = data[i].orderid;
                driverOrderIds.push(driverOrderId)
            }
           this.setState({addresses: addresses, driverOrderIds: driverOrderIds})

        }).catch((error) => {
            alert(error.message);
        });

        // fetch data from backend and assign all to displayCare
    }



clickHandler = () =>{

        this.setState({start: false, clicked: true})
    };

    deliverySubmit = (event,props) => {
        event.preventDefault();
        let body = {
            authorization: UserStoreService.getToken(),
            orderids: this.state.driverOrderIds,
        };

        userService.markDelivered(JSON.stringify(body)).then((data) => {

            console.log(data,"data");
            alert("Thanks for your delivery");
            props.history.push('/')

        }).catch((error) => {
            alert(error.message);
        });


    };

    render() {
        return (
            <div>
                <img className="rounded mx-auto d-block logo" src={logo}/>
                <Navbar bg="white" variant="light">
                    <Nav className="float-right">
                        <Nav.Link>Hi, Driver</Nav.Link>
                        <Nav.Link onClick={() => {this.props.history.push('/')}}>Main Page</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="Dbutton" id="start">
                    {this.state.start &&
                    <button onClick={this.clickHandler} className="btn btn-danger">
                        Start Delivery
                    </button>}
                    {this.state.clicked &&
                    <div className="container">
                        <button className="btn btn-danger mb-2" onClick={(event) => this.deliverySubmit(event,this.props)}>
                            End Delivery
                        </button>
                        <table
                            className="table table-bordered table-hover"
                            id="tab_logic"
                        >
                            <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Delivery Address</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.addresses.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <td>{idx+1}</td>
                                        <td>
                                            {this.state.addresses[idx]}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>}


                </div>

                {this.state.clicked &&
                <div className="inline">
                    <GoogleMap addresses = {this.state.addresses}/>
                </div>}
            </div>

        );

    };
}

export default DriverPage;