import React from 'react';
import "./LoginTest.scss";

class LoginTest extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
		this.loginSubmit = this.loginSubmit.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
	}

	emailChange(event) {
		this.setState({
			email: event.target.email
		})
	}

	passwordChange(event) {
		this.setState({
			password: event.target.password
		})
	}

	loginSubmit(event) {
		event.preventDefault();
		const form = event.target;
		/*const data = new FormData();
		data.append('email', form.email);
		data.append('password', form.password);
		console.log(data.email);
		console.log(data.password);
		console.log(data);
		console.log(JSON.stringify(data));*/

		/*const data = {
			'email': 'bz@cs.com',
			'password': '123'
		};*/

		const data = {
			'email': form.email.value,
			'password': form.password.value
		};

		fetch('http://localhost:3006/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'})
		}).then(response => {
		 	return response.json();
		}).then(response => {
		 	console.log(JSON.stringify(response));
		});
	}

	render() {
		return (
			<div>
            	<div className= "loginbox">
                	<h1>Welcome</h1>
                	<form onSubmit={this.loginSubmit}>
                    	<div className="inner-icon left-addon">
                        	<span className="glyphicon glyphicon-user" />
                        	<input type="text" placeholder="Enter Username" name="email" /*value={this.state.email} onChange={this.emailChange}*/ required />
                    	</div>
                    	<div className="inner-icon left-addon">
                        	<span className="glyphicon glyphicon-lock" />
                    		<input type="password" /*ref="password"*/ placeholder="Enter Password" name="password" /*value={this.state.password} onChange={this.passwordChange}*/ required />
            			</div>
            			<input type="submit" name="" value="Login" />
                    	<a href="#">Don't have an account? </a>
            		</form>
        		</div>
        	</div>
		);
	}
}

export default LoginTest;