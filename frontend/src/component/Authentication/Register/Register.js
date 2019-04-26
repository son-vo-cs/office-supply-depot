import React from 'react';
import userService from "../../../common/services/User/UserService";
import userStoreService from "../../../common/services/User/UserStoreService";



class Register extends React.Component {


    handleSubmit = (event,props) => {
        event.preventDefault();
    let body = {
        firstname: event.target.fname.value,
        lastname: event.target.lname.value,
        email: event.target.email.value,
        password: event.target.password.value,
    };


    if (body.password === event.target.cPassword.value) {
        userService.userRegister(JSON.stringify(body)).then((data) => {
           // console.log(data);
            console.log(props,"myprops")
            alert('Register Succeed')
            props.history.push('/')
        }).catch((error) => {
            alert(error.message);
        });


    } else {
        alert('Sorry, the passwords are not same.')
    }

    };

    render() {
        return (<div>


            <div className="container">
                <h4 className="header-title m-t-0">Register</h4>
                <p className="text-muted font-14 m-b-20">
                    Please follow the instruction to fill in the register form.
                </p>

                <form onSubmit={(event) => this.handleSubmit(event,this.props)}>
                    <div className="form-group">
                        <label htmlFor="fisrtName">First Name<span className="text-danger">*</span></label>
                        <input type="text" name="fname" required
                               placeholder="Enter user name" className="form-control" id="fname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                        <input type="text" name="lname" required
                               placeholder="Enter user name" className="form-control" id="lname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email address<span className="text-danger">*</span></label>
                        <input type="email" name="email" required
                               placeholder="Enter email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass1">Password<span className="text-danger">*</span></label>
                        <input type="password" name="password" required
                               placeholder="Password" className="form-control" id="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passWord2">Confirm Password <span className="text-danger">*</span></label>
                        <input type="password" required name='cPassword'
                               placeholder="Password" className="form-control" id="cPassword"/>
                    </div>

                    <div className="form-group text-right m-b-0">

                        <input type='submit' name='Submit' className="btn btn-danger"/>


                    </div>
                </form>

            </div>
        </div>);
    };

}

export default Register;