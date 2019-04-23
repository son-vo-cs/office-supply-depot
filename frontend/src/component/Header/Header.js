import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../images/ezgif-1-e382b6df9dbb.png"
import "./Header.css"
import Modal from '@material-ui/core/Modal';
import Login from '../Authentication/Login/Login';
import Card from './Card/Card';
import userService from "../../common/services/User/UserService";
import userStoreService from "../../common/services/User/UserStoreService";


class Header extends Component {



    state = {
        userStatus: userStoreService.isLoggedin()? 'User Profile': 'Login',
        nameData: [],
        allData:[],
        open: false,
        selectedMenu: null,
    };


    // showDisplayCare = () => {
    //         userService.getAll().then((data) => {
    //             userStoreService.setUser(data);
    //             console.log(data);
    //             alert('Register Succeed')
    //         }).catch((error) => {
    //             alert(error.message);
    //         });
    //         props.history.push('/')
    //
    // };

    componentDidMount() {
        this.setState({
            selectedMenu: document.getElementById('all')
        });
        userService.getAll().then((data) => {
            userStoreService.setUser(data);
            console.log(data);
            this.setState({nameData: data, allData: data});
            console.log(this.state.nameData);
        }).catch((error) => {
            alert(error.message);
        });

        // fetch data from backend and assign all to displayCare
    }

    handleOpen = () => {
        if (this.state.userStatus === 'Login') {
            this.setState({open: true});
        } else {
            this.props.history.push('/userprofile')
        }

    };

    handleClose = (login = false) => {
        let userStatus = 'Login';
        if (login) {
            userStatus = 'User Profile';
        }
        this.setState({
            userStatus,
            open: false
        });
    };

    menuHandler = (care, element) => {
        let allData = this.state.allData;
        let nameData =[];

        if (this.state.selectedMenu !== null) {
            this.state.selectedMenu.className = '';
        }

        switch (care) {
            case 'ink': {
                console.log(this.state.nameData);
                nameData = allData.filter(function (ink) {
                    return ink.category === "ink & toner";
                });
                console.log(nameData);
                break;
            }

            case 'paper': {
                nameData = allData.filter(function (paper) {
                    return paper.category === "paper";
                });
                console.log(nameData);
                break;
            }
            case 'office': {
                nameData = allData.filter(function (office) {
                    return office.category === "office supplies";
                });
                console.log(nameData);
                break;
            }
            case 'school': {
                nameData = allData.filter(function (school) {
                    return school.category === "school supplies";
                });
                console.log(nameData);
                break;
            }
            case 'elec': {
                nameData = allData.filter(function (elec) {
                    return elec.category === "electronic";
                });
                console.log(nameData);
                break;
            }
            case 'furn': {
                nameData = allData.filter(function (furn) {
                    return furn.category === "furniture";
                });
                console.log(nameData);
                break;
            }
            case 'clean': {
                nameData = allData.filter(function (clean) {
                    return clean.category === "cleaning";
                });
                console.log(nameData);
                break;
            }

            case 'all': {
                nameData = allData;
            }
        }

        element.target.className = 'active';
        this.setState({
            selectedMenu: element.target,
            nameData: nameData
        })
    };

    render() {

        return (
            <div>

                <img className="rounded mx-auto d-block logo" src={logo} alt=""/>

                <Navbar bg="white" variant="light">
                    <Nav className="float-right">
                        <Nav.Link onClick={this.handleOpen}>{this.state.userStatus}</Nav.Link>
                        <Nav.Link onClick={() => {this.props.history.push('/cart')}}>Shopping Cart</Nav.Link>

                    </Nav>
                </Navbar>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={() => this.handleClose(false)}
                >
                    <Login closeModal={this.handleClose}/>
                </Modal>


                <div className="vertical-menu">

                    <a id='all' className='active' onClick={(event) => {
                        this.menuHandler('all', event)
                    }}>View All</a>
                    <a onClick={(event) => {
                        this.menuHandler('ink', event)
                    }}>Ink & Toner</a>
                    <a onClick={(event) => {
                        this.menuHandler('paper', event)
                    }}>Paper & Stationery</a>
                    <a onClick={(event) => {
                        this.menuHandler('office', event)
                    }}>Office Supplies</a>
                    <a onClick={(event) => {
                        this.menuHandler('school', event)
                    }}>School Supplies</a>
                    <a onClick={(event) => {
                        this.menuHandler('elec', event)
                    }}>Electronics</a>
                    <a onClick={(event) => {
                        this.menuHandler('furn', event)
                    }}>Furniture</a>
                    <a onClick={(event) => {
                        this.menuHandler('clean', event)
                    }}>Cleaning</a>
                </div>

                <div className='cardBox'>
                    {
                        this.state.nameData.map((val, index) => {
                            return (
                                <Card cardName={val.name} cardUrl={val.url} cardId={index+1} key={index}/>
                            )
                        })
                    }
                </div>

            </div>);
    }
}

export default Header;