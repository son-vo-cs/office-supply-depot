import React, {Component} from 'react';
import "./Cart.css"
import {Link} from "react-router-dom";
import UserStoreService from "../../common/services/User/UserStoreService";
import userService from "../../common/services/User/UserService";

class Cart extends Component {

    state = {
        rows: UserStoreService.getShoppingCart(),
        itemId:[],
        qualities: [],
        itemList: [],
        cartPrice: 0
    };

    componentDidMount() {


        let unique = [...new Set(this.state.rows)];
        console.log(unique);

        let list = [];
        for (let i = 0; i < this.state.rows.length; i++) {
            let body = {
                itemid: this.state.rows[i],
            };

            console.log(body);
            userService.getItem(JSON.stringify(body)).then((data) => {
                console.log("data",data);
                list.push(data);
                console.log("cartprice",this.state.cartPrice);
                console.log("list",list);
                this.setState({
                    itemList: list,
                    cartPrice: this.state.cartPrice + data.price
                });
            }).catch((error) => {
                alert(error.message);
            });
        }
    }

    handleRemoveItem = (idx) => {

        let r = this.state.itemList[idx];
        this.setState({
            itemList: this.state.itemList.filter(function (row) { return row !== r })
        });

        this.setState((state) => {
            //read `state` instead of `this.state` when updating.
            return {cartPrice: state.cartPrice - r.price}
        });

        console.log("itemlist",this.state.itemList);


    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <div className="panel-title">
                                        <div className="row padButtom">
                                            <div className="col-xs-6">
                                                <h5><span className="glyphicon glyphicon-shopping-cart"/> Shopping
                                                    Cart</h5>
                                            </div>
                                            <div className="col-xs-6 pad1">
                                                <Link to="/">
                                                    <button type="button" className=" btn btn-danger btn-sm">
                                                        Continue
                                                        Shopping
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-body">

                                    {this.state.itemList.map((item, idx) => (
                                    <div className="row mb-5">
                                        <div className="col-xs-2">
                                            <img className="CartImgSize img-responsive" src={item.url} alt=""/>
                                        </div>
                                        <div className="col-xs-4 pad2">
                                            <h6 className="product-name"><strong>{item.name}</strong></h6>
                                            <h4>
                                                <small>Product weight: {item.weight} lb</small>
                                            </h4>
                                        </div>
                                        <div className="col-xs-12 pad3">
                                            <div className="col-xs-12 text-right">
                                                <h6><strong>$ {item.price}<span className="text-muted"> x </span></strong>
                                                    <strong>1</strong>
                                                </h6>
                                            </div>

                                            <div className="col-xs-2">
                                                <button onClick={() => this.handleRemoveItem(idx)} type="button" className="btn btn-link btn-xs">
                                                    <span className="glyphicon glyphicon-trash"> </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    ))}

                                </div>
                                <div className="panel-footer">
                                    <div className="row text-center">
                                        <div className="col-xs-9">
                                            <h4 className="text-right">Total<strong>${parseFloat(this.state.cartPrice).toFixed(2)}</strong></h4>
                                        </div>
                                        <div className="col-xs-3 pad1">
                                            <Link to="/checkout">
                                                <button type="button" className="btn btn-success btn-block">
                                                    Checkout
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;