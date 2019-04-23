import React, {Component} from 'react';
import "./Checkout.scss"
import Form from "react-bootstrap/Form";
import userStoreService from './../../common/services/User/UserStoreService';

class Checkout extends Component {
    state = {
        shippingDisable: false
    };

    shippingAddressSubmit = (event) => {
        this.setState({
            shippingDisable: true
        });
        console.log(userStoreService.getUser())
        event.preventDefault();
    };

    render() {
        return (
            <div className="bg">
                <div className="container">
                    <h1 className="m-t-0 header-title"><b>Check out</b></h1>

                    <div className="card-box">
                        <h4 className="m-t-0 header-title"><b>Shipping Address</b></h4>
                        <p className="text-muted m-b-30 font-13">
                            Check out Info
                        </p>
                        <form onSubmit={(event) => this.shippingAddressSubmit(event)}>
                            <div className="form-group">
                                <label htmlFor="fisrtName">First Name<span className="text-danger">*</span></label>
                                <input type="text" name="fname" required disabled={this.state.shippingDisable}
                                       placeholder="Enter user name" className="form-control" id="firstName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                                <input type="text" name="lname" required disabled={this.state.shippingDisable}
                                       placeholder="Enter user name" className="form-control" id="lastName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address<span className="text-danger">*</span></label>
                                <input type="text"  placeholder="Address" required disabled={this.state.shippingDisable}
                                       className="form-control"  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City<span className="text-danger">*</span></label>
                                <input type="text" required disabled={this.state.shippingDisable}
                                       placeholder="City" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipcode">Zip Code<span className="text-danger">*</span></label>
                                <input type="text" required disabled={this.state.shippingDisable}
                                       placeholder="Zip Code" className="form-control"/>
                            </div>


                            <div className="form-group text-right m-b-0">
                                <button className="btn btn-danger" type="submit">
                                    Continue
                                </button>

                            </div>
                        </form>

                    </div>
                    <div className="card-box">
                        <h4 className="m-t-0 header-title"><b>Shipping method</b></h4>

                        <p className="text-muted m-b-30 font-13">
                           shipping Info
                        </p>

                        <table className="table table-responsive">

                            <tbody>
                            <tr>
                                <td>
                                    <div className="radio">
                                        <label><input type="radio" id='express' name="optradio" className="checkoutMargin"/>
                                            Everyday Free Shipping
                                            Transit time: 3-6 business days
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="radiotext">
                                        <label htmlFor='free'>
                                            <font color="red">FREE
                                            </font>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="radio">
                                        <label><input type="radio" id='regular' name="optradio" className="checkoutMargin"/>
                                            Premium Shipping
                                            Transit time: 2-3 business days
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="radiotext">
                                        <label htmlFor='premium'>$12.00</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="radio">
                                        <label><input type="radio" id='express' name="optradio" className="checkoutMargin" />
                                            Express Shipping
                                            Transit time: 1-2 business days
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="radiotext">
                                        <label htmlFor='express'>$22.00</label>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-box">
                        <h4 className="m-t-0 header-title"><b>Payment</b></h4>

                        <p className="text-muted m-b-30 font-13">
                            Payment Info
                        </p>

                        <div className="form-group">
                            <label htmlFor="cardtype">Card Type<span className="text-danger">*</span></label>
                        <Form>
                            <Form.Control as="select">
                                <option>Visa</option>
                                <option>MasterCard</option>
                                <option>American Express</option>
                                <option>Discovery</option>
                            </Form.Control>
                        </Form>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardnumber">Card Number<span className="text-danger">*</span></label>
                            <input type="number" required
                                   placeholder="Card Number" className="form-control"/>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-6">
                                <label htmlFor="exp">Expiration Month<span className="text-danger">*</span></label>
                                <Form>
                                    <Form.Control as="select">
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </Form.Control>
                                </Form>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="exp">Year<span className="text-danger">*</span></label>
                                <Form>
                                    <Form.Control as="select">
                                        <option>2019</option>
                                        <option>2020</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                        <option>2026</option>
                                        <option>2027</option>
                                        <option>2028</option>
                                    </Form.Control>
                                </Form>
                            </div>
                        </div>
                            <div className="form-group">
                                <label htmlFor="security">Security Number<span className="text-danger">*</span></label>
                                <input type="number" required
                                       placeholder="Security Number" className="form-control"/>
                            </div>
                        <div className="form-group text-right m-b-0">
                            <button className="btn btn-danger" type="submit">
                                Continue
                            </button>

                        </div>

                    </div>

                    <div className="card-box">
                        <h4 className="m-t-0 header-title"><b>Contact Info</b></h4>

                        <p className="text-muted m-b-30 font-13">
                            Contact Info
                        </p>
                        <div className="form-group">
                            <label htmlFor="phonenumber">Phone Number<span className="text-danger">*</span></label>
                            <input type="number" required
                                   placeholder="Phone Number" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address<span className="text-danger">*</span></label>
                            <input type="email" required
                                   placeholder="Email Address" className="form-control"/>
                        </div>
                        <div className="form-group text-right m-b-0">
                            <button className="btn btn-danger" type="submit">
                                Place Order
                            </button>

                        </div>
                    </div>

                        </div>
                    </div>

        );
    }
}

export default Checkout;