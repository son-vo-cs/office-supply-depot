import React, {Component} from 'react';
import "./ProductDetail.css";
import ink1 from "../images/ink1.jpg";
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import StarRatings from 'react-star-ratings';
import userService from "../../common/services/User/UserService";
import userStoreService from "../../common/services/User/UserStoreService";

class ProductDetail extends Component {

    state = {
        itemData:[],
        status:"Out of Stock"
    };



    componentDidMount() {
        let body = {
            itemid: this.props.match.params.productId,

        };

        let quality = null;
        console.log(body);
        userService.getItem(JSON.stringify(body)).then((data) => {


            console.log(data);
            this.setState({itemData: data});
            quality = data.quantity;
            if (quality > 0)
            {
                this.setState({status: "In Stock"});
            }

        }).catch((error) => {
            alert(error.message);
        });


    }

    addToShoppingcart = (event,itemid) => {

        userStoreService.addShoppingCartInfo(itemid);
        console.log(userStoreService.getShoppingCart())
        alert("Thanks to add this Item to the Shopping Cart")

    };

    render() {
        return (
            <div>
                
            <div className="container-fluid">
                <div className="content-wrapper">
                    <div className="item-panel">
                        <div className="row">
                            <div className="col-xs-6">
                                <h5>
                                    <span className="glyphicon glyphicon-shopping-cart"/> Shopping
                                    Cart
                                </h5>
                            </div>
                        <div className="col-xs-6 padButton">
                            <Link to="/">
                                <button type="button" className=" btn btn-link btn-sm">
                                    <span className="glyphicon glyphicon-chevron-left"></span>
                                    Continue
                                    shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                        <div className="container">
                            <div className="col-md-12">
                                <div className="row">
                                <div className="product col-md-3 service-image-left margindefine">


                                        <img className="img-container" 
                                             src={this.state.itemData.url}
                                             alt=""/>

                                </div>




                            <div className="col-md-7">
                                <div className="product-title">{this.state.itemData.name}</div>
                                <div className="product-desc">Weight: {this.state.itemData.weight} lb</div>
                                <hr/>
                                    <div className="product-price">$ {this.state.itemData.price}</div>

                                    <div className="product-stock">{this.state.status}</div>
                                    <hr/>
                                        <div className="btn-group cart">
                                            <button type="button" className="btn btn-success" onClick={(event)=> this.addToShoppingcart(event,this.state.itemData.itemid)}>
                                                Add to cart
                                            </button>
                                        </div>
                                <div className="btn-group wishlist paddingdefine">
                                    <button type="button" className="btn btn-warning" onClick={() => {this.props.history.push('/cart')}}>
                                        Shopping Cart
                                    </button>
                                </div>
                                <div className="btn-group wishlist paddingdefine">
                                    <button type="button" className="btn btn-danger" onClick={() => {this.props.history.push('/')}}>
                                        Main Page
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="col-md-12 product-info">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                       role="tab" aria-controls="home" aria-selected="true">DESCRIPTION</a>
                                </li>
                                {/*<li className="nav-item">*/}
                                    {/*<a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"*/}
                                       {/*role="tab" aria-controls="profile" aria-selected="false">PRODUCT INFO</a>*/}
                                {/*</li>*/}

                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">{this.state.itemData.description}</div>
                                {/*<div className="tab-pane fade" id="profile" role="tabpanel"*/}
                                     {/*aria-labelledby="profile-tab"><h5>SpeedyInks Remanufactured Ink Features:</h5>*/}
                                    {/*<li>It supports the latest ATX12V v2.3 standard and is backward compatible with*/}
                                        {/*ATX12V 2.2 and ATX12V 2.01 systems*/}
                                    {/*</li>*/}
                                    {/*<li>For use in Epson: Stylus NX530, Stylus NX625, WorkForce WF-3520, WorkForce WF-3530, WorkForce WF-3540, WorkForce WF-7010,*/}
                                        {/*WorkForce WF-7510, WorkForce WF-7520, WorkForce 60, WorkForce 545,*/}
                                        {/*WorkForce 630, WorkForce 633, WorkForce 635, WorkForce 645, WorkForce 840, and WorkForce 845*/}
                                    {/*</li>*/}
                                    {/*<li>Set includes: 1x T127120 1x T12720, 1x T127320, & 1x T127420*/}
                                    {/*</li>*/}
                                    {/*<li>Page Yield Black: 945| Colors: 755</li>*/}
                                    {/*<li>100% Quality Satisfaction Guarantee*/}
                                    {/*</li>*/}
                                    {/*<li>The use of aftermarket replacement cartridges and supplies does not void your printer's warranty</li>*/}
                                    {/*<li>A three year warranty and lifetime access to Corsair’s legendary technical*/}
                                        {/*support and customer service*/}
                                    {/*</li>*/}
                                    {/*<li>Over Current/Voltage/Power Protection, Under Voltage Protection and Short*/}
                                        {/*Circuit Protection provide complete component safety*/}
                                    {/*</li>*/}
                                    {/*<li>Dimensions: 150mm(W) x 86mm(H) x 160mm(L)</li>*/}
                                    {/*<li>MTBF: 100,000 hours</li>*/}
                                    {/*<li>Safety Approvals: UL, CUL, CE, CB, FCC Class B, TÜV, CCC, C-tick</li>*/}
                                {/*</div>*/}

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>)
    }
}

export default ProductDetail;