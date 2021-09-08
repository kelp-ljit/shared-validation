const React = require('react');
const LoginForm = require('../components/forms/login-form');
const RegisterForm = require('../components/forms/register-form');
const RootCreateUserForm = require('../components/forms/root/create-user-form');

module.exports = class Home extends React.Component {
	render() {
		return (
			<>
				<nav className="navbar sticky-top navbar-dark bg-dark">
					<div className="container">
						<a className="navbar-brand" href="/">shared-validation</a>
					</div>
				</nav>
				<div className="container pt-3">
					<div className="row">
						<LoginForm/>
						<RegisterForm/>
						<RootCreateUserForm/>
					</div>
				</div>
			</>
		);
	}
};
