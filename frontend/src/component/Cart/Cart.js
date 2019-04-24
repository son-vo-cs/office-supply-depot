import React, {Component} from 'react';
import "./Cart.css"
import {Link} from "react-router-dom";
import UserStoreService from "../../common/services/User/UserStoreService";
import userService from "../../common/services/User/UserService";

class Cart extends Component {

    state = {
        rows: UserStoreService.getShoppingCart(),
        itemId:[...new Set(UserStoreService.getShoppingCart())],
        qualities: [],
        itemList: [],
        totalPrice: [],
    };

    componentDidMount() {


    //    let unique = [...new Set(this.state.rows)];
        //console.log("6666",unique);
       // this.setState({itemId: unique});
   //     console.log(this.state.itemId);

        let list = [];
        let quality = [];
        let price = [];
        let tPrice = 0;
        let totalP = 0;
        for (let i = 0; i < this.state.itemId.length; i++) {
            let body = {
                itemid: this.state.itemId[i],
            };
            console.log(body);
            userService.getItem(JSON.stringify(body)).then((data) => {
                console.log(data);
                list.push(data);
                tPrice =+ data.price * this.state.qualities[i];
                price.push(tPrice);
                this.setState({totalPrice: price});
                console.log(tPrice,"dsafhjgfddasfgjf");
                console.log(this.state.totalPrice,"dsafhjgfddasfgjf");
                this.setState({itemList: list});
            }).catch((error) => {
                alert(error.message);
            });
        }
        for (let i = 0; i < this.state.itemId.length; i++) {
            let count = 0;
            for(let j = 0; j < this.state.rows.length; j++) {
                if(this.state.itemId[i] === this.state.rows[j]){
                    count++;
                    quality[i] = count;
                }
            }
        }
        this.setState({qualities: quality});




    }

    handleRemoveRow = (idx) => {


        let r = this.state.itemList[idx];
        let p = this.state.itemId[idx];
        let l = this.state.itemId.filter(function (row) {
            return row !== p;
        });
        this.setState({
            itemList: this.state.itemList.filter(function (row) {
                return row !== r;
            }),
        });
        UserStoreService.setShoppingCart(l);


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
                                                        shopping
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-body">

                                    {this.state.itemList.map((item, idx) => (
                                    <div className="row mb-5">
                                        <div className="col-xs-2"><img className="CartImgSize img-responsive"
                                                                       src={item.url}/>
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
                                                    <strong>{this.state.qualities[idx]}</strong>
                                                </h6>
                                            </div>

                                            <div className="col-xs-2">
                                                <button onClick={() => this.handleRemoveRow(idx)} type="button" className="btn btn-link btn-xs">
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
                                            <h4 className="text-right">Total <strong>$ {this.state.totalPrice.reduce(function (acc,currentValue) {
                                                return acc + currentValue;
                                            }, 0).toFixed(2)}</strong></h4>
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