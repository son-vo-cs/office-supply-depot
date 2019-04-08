import React, {Component} from 'react';
import './App.css';
import apiService from './common/services/ApiService';
import Headers from './component/Header/Header';
import Login from "./component/Authentication/Login/Login";
import Register from "./component/Authentication/Register/Register";
import LoginTest from "./component/Authentication/LoginTest/LoginTest";

class App extends Component {
    click = () => {
        apiService.simpleApi().then((res) => {
           console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return (


           <LoginTest />
        );
    }
}

export default App;
