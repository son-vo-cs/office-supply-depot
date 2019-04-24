import React, {Component} from 'react';
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class UserProfile extends Component {
    state = {
        name: 'Zoe Zhao',
        email: 'zoefyz12@gmail.com',
        orderId: '000001',
        orderStatus: 'Shipped',
        date: '04/08/2019',
        totalPrice: '$103.46',
        ordername: ['Boise POLARIS® Premium Multipurpose Paper, Letter Paper Size, FSC® Certified, White, 500 Sheets Per Ream, Case Of 10 Reams',
            'Realspace® Magellan Performance Collection L-Shaped Desk, Espresso Realspace® Magellan Performance Collection L-Shaped Desk, Espresso',
            'Lenovo® IdeaPad™ 530S Laptop, 14" Screen, AMD Ryzen™ 5, 8GB Memory, 256GB Solid State Drive, Windows® 10 Home'],
        pic: ['https://officedepot.scene7.com/is/image/officedepot/196697_p_boise_polaris_premium_multipurpose_paper?$OD-Med$',
            'https://officedepot.scene7.com/is/image/officedepot/956652_p_realspace_magellan_performance_collection_l_desk?$OD-Med$',
            'https://officedepot.scene7.com/is/image/officedepot/2553990_o01_lenovo_ideapad_530s_laptop?$OD-Med$'],
        rows: ['1','1','1'],
        price:['$90','$1990','$370']

    };

    render() {
        return (<div className="bg">


            <div className="container">
                <img className="rounded mx-auto d-block Mlogo" src={logo}/>
                <Navbar variant="light">
                    <Nav className="float-right">
                        <Nav.Link >Hi, Customer</Nav.Link>
                        <Nav.Link onClick={() => {this.props.history.push('/')}}>Main Page</Nav.Link>
                    </Nav>
                </Navbar>

                <div className="card-box">
                    <h4 className="m-t-0 header-title"><b>User Information</b></h4>
                    <p className="text-muted m-b-30 font-13">
                        Name: {this.state.name}
                    </p>
                    <p className="text-muted font-13">
                        Email: {this.state.email}
                    </p>

                </div>

                <div className="card-box">
                    <h4 className="m-t-0 header-title"><b>Order History</b></h4>
                    <div>
                    <div className="bg">
                    <div className="text-muted m-b-30 font-13">

                        OrderId: {this.state.orderId}
                    </div>
                        <div className="text-muted m-b-30 font-13">
                        OrderStatus: {this.state.orderStatus}
                        </div>
                        <div className="text-muted m-b-30 font-13">
                        Date: {this.state.date}
                        </div>
                        <div className="text-muted m-b-30 font-13">
                        TotalPrice: {this.state.totalPrice}

                    </div>
                    </div>

                        <div className="row clearfix">
                            <div className="col-md-12 column">
                                <table
                                    className="table table-bordered table-hover"
                                    id="tab_logic"
                                >
                                    <thead>
                                    <tr>

                                            <th className="text-center"> Picture </th>
                                        <th className="text-center"> Name </th>
                                        <th className="text-center"> Price </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.rows.map((item, idx) => (
                                        <tr id="addr0" key={idx}>

                                            <td>
                                                <img className="rounded managerpicsize" src= {this.state.pic[idx]} />
                                            </td>
                                            <td>
                                            {this.state.ordername[idx]}
                                        </td>
                                            <td>
                                                {this.state.price[idx]}
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>


                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </div>);
    }
}

export default UserProfile;