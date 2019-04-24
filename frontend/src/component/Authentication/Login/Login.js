import React from 'react';
import "./Login.scss";
import userService from './../../../common/services/User/UserService';
import userStoreService from './../../../common/services/User/UserStoreService';

const handleSubmit = (event, closeModal) => {

    let body = {
        email: event.target.email.value,
        password: event.target.psw.value
    };

    userService.userLogin(JSON.stringify(body)).then((data) => {
        userStoreService.setUser(data);
      //  console.log(data);
        closeModal(true);
    }).catch((error) => {
        alert(error.message);
    });

    event.preventDefault();
};

const Login = ({closeModal}) => {
    return (
        <div>
            <div className="loginbox">
                <h1>Welcome</h1>
                <form onSubmit={(event) => handleSubmit(event, closeModal)}>
                    <div className="inner-icon left-addon">
                        <span className="glyphicon glyphicon-user"/>
                        <input type="email" name="email" placeholder="Enter email address" required/>
                    </div>
                    <div className="inner-icon left-addon">
                        <span className="glyphicon glyphicon-lock"/>
                        <input type="password" name="psw" placeholder="Enter Password" required/>
                    </div>
                    <input type="submit" name="" value="Login">

                    </input>

                    <a href="/register">Don't have an account? </a>
                </form>
            </div>

        </div>


    );
};

export default Login;
